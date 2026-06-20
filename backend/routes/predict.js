const express = require("express");
const multer = require("multer");
const { Client } = require("@gradio/client");
const modelsConfig = require("../config/models.config");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 Mo max
});

// On garde une connexion ouverte par Space pour éviter de la
// recréer à chaque requête (plus rapide).
const clientCache = {};
async function getClient(spaceId) {
  if (!clientCache[spaceId]) {
    const options = process.env.HF_TOKEN ? { hf_token: process.env.HF_TOKEN } : {};
    clientCache[spaceId] = await Client.connect(spaceId, options);
  }
  return clientCache[spaceId];
}

// Les Spaces Gradio de classification d'image renvoient en général un objet
// `gr.Label`, du type { label: "Black_Soil", confidences: [{label, confidence}, ...] }.
// On normalise ici pour que le frontend ait toujours la même forme, quel que
// soit le format exact renvoyé par ton Space.
function normalizeResult(raw) {
  if (raw && Array.isArray(raw.confidences)) {
    return {
      predictedClass: raw.label,
      probabilities: Object.fromEntries(
        raw.confidences.map((c) => [c.label, c.confidence])
      ),
    };
  }

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const entries = Object.entries(raw);
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    return {
      predictedClass: sorted.length ? sorted[0][0] : null,
      probabilities: raw,
    };
  }

  return { predictedClass: String(raw), probabilities: {} };
}

async function callModel(modelKey, fileBuffer, mimetype) {
  const cfg = modelsConfig[modelKey];
  if (!cfg) throw new Error(`Modèle inconnu : ${modelKey}`);
  if (cfg.spaceId.startsWith("TODO")) {
    throw new Error(
      "Le Space Hugging Face n'est pas encore configuré (voir backend/config/models.config.js)"
    );
  }

  const client = await getClient(cfg.spaceId);
  const blob = new Blob([fileBuffer], { type: mimetype });

  const result = await client.predict(cfg.apiName, {
    image: blob,
    ...cfg.extraInputs,
  });

  const raw = Array.isArray(result.data) ? result.data[0] : result.data;
  const normalized = normalizeResult(raw);

  return {
    model: modelKey,
    label: cfg.label,
    shortLabel: cfg.shortLabel,
    ...normalized,
  };
}

// POST /api/predict  { model } + image -> prédiction d'un seul modèle
router.post("/predict", upload.single("image"), async (req, res) => {
  try {
    const { model } = req.body;
    if (!req.file) return res.status(400).json({ error: "Aucune image envoyée." });
    if (!model || !modelsConfig[model]) {
      return res.status(400).json({ error: "Modèle invalide ou manquant." });
    }

    const result = await callModel(model, req.file.buffer, req.file.mimetype);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Échec de la prédiction.", details: err.message });
  }
});

// POST /api/predict-all  image -> prédiction des 4 modèles en parallèle
router.post("/predict-all", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Aucune image envoyée." });

    const modelKeys = Object.keys(modelsConfig);
    const settled = await Promise.allSettled(
      modelKeys.map((key) => callModel(key, req.file.buffer, req.file.mimetype))
    );

    const results = settled.map((r, i) => {
      const key = modelKeys[i];
      if (r.status === "fulfilled") return r.value;
      return {
        model: key,
        label: modelsConfig[key].label,
        shortLabel: modelsConfig[key].shortLabel,
        error: r.reason.message,
      };
    });

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Échec de la prédiction.", details: err.message });
  }
});

// GET /api/models -> liste des modèles disponibles (pour remplir le sélecteur)
router.get("/models", (req, res) => {
  const list = Object.entries(modelsConfig).map(([key, cfg]) => ({
    key,
    label: cfg.label,
    shortLabel: cfg.shortLabel,
  }));
  res.json(list);
});

module.exports = router;
