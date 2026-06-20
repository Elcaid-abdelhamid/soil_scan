import { CLASS_COLORS } from "../constants";

const CLASSES = [
  "Alluvial_Soil",
  "Arid_Soil",
  "Black_Soil",
  "Laterite_Soil",
  "Mountain_Soil",
  "Red_Soil",
  "Yellow_Soil",
];

// Bande de strates des 7 types de sol — légende couleur permanente,
// et signature visuelle de l'app (un horizon pédologique en miniature).
export default function StrataLegend() {
  return (
    <div>
      <div className="strata-legend">
        {CLASSES.map((c) => (
          <div key={c} className="strata-segment" style={{ background: CLASS_COLORS[c] }} />
        ))}
      </div>
      <div className="strata-legend-labels">
        {CLASSES.map((c) => (
          <div key={c} className="label-item">
            {c.replace("_Soil", "").replace("_", " ")}
          </div>
        ))}
      </div>
    </div>
  );
}
