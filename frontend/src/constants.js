// Couleurs partagées par toute l'app : légende, carottes de confiance,
// graphiques du dashboard. Chaque teinte évoque le sol réel qu'elle désigne.
export const CLASS_COLORS = {
  Alluvial_Soil: "var(--c-alluvial)",
  Arid_Soil: "var(--c-arid)",
  Black_Soil: "var(--c-black)",
  Laterite_Soil: "var(--c-laterite)",
  Mountain_Soil: "var(--c-mountain)",
  Red_Soil: "var(--c-red)",
  Yellow_Soil: "var(--c-yellow)",
};

// Version hex (nécessaire pour recharts qui ne résout pas les var() CSS)
export const CLASS_COLORS_HEX = {
  Alluvial_Soil: "#8c7a5b",
  Arid_Soil: "#ddb97a",
  Black_Soil: "#2e2419",
  Laterite_Soil: "#b5602e",
  Mountain_Soil: "#6b5842",
  Red_Soil: "#9c3b2c",
  Yellow_Soil: "#d9a441",
};

export const CLASS_LABELS_FR = {
  Alluvial_Soil: "Sol alluvial",
  Arid_Soil: "Sol aride",
  Black_Soil: "Sol noir",
  Laterite_Soil: "Latérite",
  Mountain_Soil: "Sol de montagne",
  Red_Soil: "Sol rouge",
  Yellow_Soil: "Sol jaune",
};
