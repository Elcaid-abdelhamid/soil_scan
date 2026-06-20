// Données extraites directement des sorties du notebook
// "Classification des Types de Sols — Fine-Tuning avec EfficientNetB0"
// (dataset CyAUG-Dataset / Original-Dataset, 7 classes de sols)

module.exports = {
  classes: [
    "Alluvial_Soil",
    "Arid_Soil",
    "Black_Soil",
    "Laterite_Soil",
    "Mountain_Soil",
    "Red_Soil",
    "Yellow_Soil",
  ],

  // Distribution complète du dataset (CyAUG-Dataset, 5096 images)
  classDistribution: [
    { name: "Alluvial_Soil", count: 692, pct: 13.6 },
    { name: "Arid_Soil", count: 284, pct: 5.6 },
    { name: "Black_Soil", count: 1173, pct: 23.0 },
    { name: "Laterite_Soil", count: 219, pct: 4.3 },
    { name: "Mountain_Soil", count: 201, pct: 3.9 },
    { name: "Red_Soil", count: 1126, pct: 22.1 },
    { name: "Yellow_Soil", count: 1401, pct: 27.5 },
  ],
  totalImages: 5096,

  // Répartition train / val / test (dataset préparé pour l'entraînement)
  splitDistribution: [
    { name: "Alluvial_Soil", train: 35, val: 7, test: 8, total: 50 },
    { name: "Arid_Soil", train: 198, val: 43, test: 43, total: 284 },
    { name: "Black_Soil", train: 178, val: 38, test: 39, total: 255 },
    { name: "Laterite_Soil", train: 153, val: 33, test: 33, total: 219 },
    { name: "Mountain_Soil", train: 140, val: 30, test: 31, total: 201 },
    { name: "Red_Soil", train: 76, val: 16, test: 17, total: 109 },
    { name: "Yellow_Soil", train: 48, val: 10, test: 11, total: 69 },
  ],
  splitTotals: { train: 828, val: 177, test: 182 },

  // Comparaison des 4 stratégies entraînées dans le notebook
  modelComparison: [
    {
      model: "EfficientNetB0 (FE)",
      testLoss: 0.4308,
      testAccuracy: 0.8407,
      testTop3Accuracy: 0.9725,
    },
    {
      model: "EfficientNetB0 (FT)",
      testLoss: 0.4395,
      testAccuracy: 0.8516,
      testTop3Accuracy: 0.978,
    },
    {
      model: "ResNet50 (FE)",
      testLoss: 0.4717,
      testAccuracy: 0.8571,
      testTop3Accuracy: 0.978,
    },
    {
      model: "ResNet50 (FT)",
      testLoss: 0.5138,
      testAccuracy: 0.8462,
      testTop3Accuracy: 0.978,
    },
  ],

  // Rapport de classification détaillé — EfficientNetB0 (Fine-Tuning), sur le test set
  classificationReport: {
    model: "EfficientNetB0 (FT)",
    rows: [
      { name: "Alluvial_Soil", precision: 0.33, recall: 0.62, f1: 0.43, support: 8 },
      { name: "Arid_Soil", precision: 0.87, recall: 0.79, f1: 0.83, support: 43 },
      { name: "Black_Soil", precision: 1.0, recall: 0.97, f1: 0.99, support: 39 },
      { name: "Laterite_Soil", precision: 0.84, recall: 0.94, f1: 0.89, support: 33 },
      { name: "Mountain_Soil", precision: 0.83, recall: 0.94, f1: 0.88, support: 31 },
      { name: "Red_Soil", precision: 1.0, recall: 0.76, f1: 0.87, support: 17 },
      { name: "Yellow_Soil", precision: 1.0, recall: 0.45, f1: 0.62, support: 11 },
    ],
    accuracy: 0.85,
    totalSupport: 182,
  },
};
