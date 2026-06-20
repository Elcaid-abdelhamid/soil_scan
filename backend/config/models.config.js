// ============================================================================
// CONFIGURATION DES MODÈLES — à adapter avec les infos de TON Space
// ============================================================================
//
// 1) Va sur ton Space Hugging Face, ouvre l'onglet "Use via API" (en bas de
//    la page du Space). Tu y verras :
//      - l'identifiant du Space (ex: "lina-ai/soil-classification")
//      - le nom exact de l'endpoint (ex: "/predict")
//      - les paramètres attendus (souvent juste "image", parfois un
//        sélecteur de modèle si un seul Space héberge les 4 modèles)
//
// 2) Remplace SPACE_ID ci-dessous (et apiName / extraInputs si besoin).
//
// 3) Si tu as 4 Spaces séparés (un par modèle), donne une spaceId
//    différente à chaque entrée plutôt qu'une seule constante.
// ----------------------------------------------------------------------------

const SPACE_ID = "TODO_remplace_par_ton_space"; // ex: "lina-ai/soil-classification"

module.exports = {
  efficientnet_fe: {
    label: "EfficientNetB0 — Feature Extraction",
    shortLabel: "EffNet (FE)",
    spaceId: SPACE_ID,
    apiName: "/predict",
    // Si ton Space a un dropdown "choix du modèle" côté Gradio, indique ici
    // le nom du paramètre tel qu'il apparaît dans "Use via API".
    extraInputs: { model_name: "efficientnet_fe" },
  },
  efficientnet_ft: {
    label: "EfficientNetB0 — Fine-Tuning",
    shortLabel: "EffNet (FT)",
    spaceId: SPACE_ID,
    apiName: "/predict",
    extraInputs: { model_name: "efficientnet_ft" },
  },
  resnet50_fe: {
    label: "ResNet50 — Feature Extraction",
    shortLabel: "ResNet50 (FE)",
    spaceId: SPACE_ID,
    apiName: "/predict",
    extraInputs: { model_name: "resnet50_fe" },
  },
  resnet50_ft: {
    label: "ResNet50 — Fine-Tuning",
    shortLabel: "ResNet50 (FT)",
    spaceId: SPACE_ID,
    apiName: "/predict",
    extraInputs: { model_name: "resnet50_ft" },
  },
};
