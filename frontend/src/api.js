// Toutes les requêtes passent par /api/... — en dev, vite.config.js redirige
// ça vers http://localhost:5000 (le backend). En prod, sers le frontend
// buildé depuis le même domaine que le backend, ou mets l'URL complète ici.

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.details || `Erreur ${res.status}`);
  }
  return res.json();
}

export async function fetchModels() {
  const res = await fetch("/api/models");
  return handleResponse(res);
}

export async function fetchDashboard() {
  const res = await fetch("/api/dashboard");
  return handleResponse(res);
}

export async function predictSingle(file, modelKey) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("model", modelKey);

  const res = await fetch("/api/predict", { method: "POST", body: formData });
  return handleResponse(res);
}

export async function predictAll(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/predict-all", { method: "POST", body: formData });
  return handleResponse(res);
}
