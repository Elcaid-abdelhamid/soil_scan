import { CLASS_COLORS } from "../constants";

// Visualise un vecteur de probabilités comme une "carotte de sol" : un tube
// vertical divisé en strates dont l'épaisseur encode la confiance du modèle
// pour chaque classe — clin d'œil direct à un véritable carottage pédologique.
export default function CoreSample({ probabilities }) {
  const sorted = Object.entries(probabilities || {}).sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((sum, [, v]) => sum + v, 0) || 1;

  return (
    <div className="core-sample-wrap">
      <div className="core-sample-tube">
        {sorted.map(([name, value]) => (
          <div
            key={name}
            className="core-sample-layer"
            style={{
              height: `${(value / total) * 100}%`,
              background: CLASS_COLORS[name] || "#999",
            }}
            title={`${name} — ${(value * 100).toFixed(1)}%`}
          />
        ))}
      </div>

      <div className="core-sample-legend">
        {sorted.map(([name, value], i) => (
          <div className={`core-row ${i === 0 ? "is-top" : ""}`} key={name}>
            <span className="core-swatch" style={{ background: CLASS_COLORS[name] || "#999" }} />
            <span className="core-row-name">{name.replace("_", " ")}</span>
            <span className="core-row-value">{(value * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
