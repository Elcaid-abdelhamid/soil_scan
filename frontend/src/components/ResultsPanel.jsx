import CoreSample from "./CoreSample";

function SingleResult({ result }) {
  return (
    <div className="card">
      <div className="result-headline">
        <span className="model-name">{result.label}</span>
      </div>
      <div className="result-headline" style={{ marginTop: 6 }}>
        <span className="result-class">{result.predictedClass?.replace("_", " ")}</span>
        {result.probabilities?.[result.predictedClass] != null && (
          <span className="confidence-pill">
            {(result.probabilities[result.predictedClass] * 100).toFixed(1)}% de confiance
          </span>
        )}
      </div>

      <div style={{ marginTop: 22 }}>
        <CoreSample probabilities={result.probabilities} />
      </div>
    </div>
  );
}

function ComparisonResults({ results }) {
  const valid = results.filter((r) => !r.error);
  const bestKey =
    valid.length > 0
      ? valid.reduce((best, r) => {
          const bestConf = best.probabilities?.[best.predictedClass] ?? 0;
          const conf = r.probabilities?.[r.predictedClass] ?? 0;
          return conf > bestConf ? r : best;
        }).model
      : null;

  return (
    <div className="comparison-grid">
      {results.map((r) => {
        const isBest = r.model === bestKey;
        return (
          <div key={r.model} className={`comparison-card ${isBest ? "is-best" : ""}`}>
            {isBest && <span className="best-tag">Confiance la plus haute</span>}
            <div className="model-option-tag">{r.shortLabel || r.label}</div>

            {r.error ? (
              <p className="error-banner" style={{ marginTop: 10 }}>
                {r.error}
              </p>
            ) : (
              <>
                <div className="result-class" style={{ fontSize: 18, marginTop: 6 }}>
                  {r.predictedClass?.replace("_", " ")}
                </div>
                {r.probabilities?.[r.predictedClass] != null && (
                  <div className="model-option-tag" style={{ marginTop: 2 }}>
                    {(r.probabilities[r.predictedClass] * 100).toFixed(1)}% de confiance
                  </div>
                )}
                <div style={{ marginTop: 14 }}>
                  <CoreSample probabilities={r.probabilities} />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ResultsPanel({ mode, singleResult, comparisonResults }) {
  if (mode === "single" && singleResult) {
    return <SingleResult result={singleResult} />;
  }
  if (mode === "all" && comparisonResults) {
    return <ComparisonResults results={comparisonResults} />;
  }
  return null;
}
