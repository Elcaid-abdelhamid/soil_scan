import { useEffect, useState } from "react";
import ImageDropzone from "../components/ImageDropzone";
import ModelSelector, { COMPARE_ALL } from "../components/ModelSelector";
import ResultsPanel from "../components/ResultsPanel";
import { fetchModels, predictSingle, predictAll } from "../api";

export default function PredictPage() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(COMPARE_ALL);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [singleResult, setSingleResult] = useState(null);
  const [comparisonResults, setComparisonResults] = useState(null);

  useEffect(() => {
    fetchModels()
      .then(setModels)
      .catch(() => setModels([]));
  }, []);

  function handleFileSelected(f) {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setSingleResult(null);
    setComparisonResults(null);
    setError(null);
  }

  function handleClear() {
    setFile(null);
    setPreviewUrl(null);
    setSingleResult(null);
    setComparisonResults(null);
  }

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setSingleResult(null);
    setComparisonResults(null);

    try {
      if (selectedModel === COMPARE_ALL) {
        const { results } = await predictAll(file);
        setComparisonResults(results);
      } else {
        const result = await predictSingle(file, selectedModel);
        setSingleResult(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const resultMode = selectedModel === COMPARE_ALL ? "all" : "single";

  return (
    <div className="tab-section">
      <div className="card">
        <div className="card-title">1. Échantillon</div>
        <div className="card-subtitle">Importe une photo du sol à analyser.</div>
        <ImageDropzone
          file={file}
          previewUrl={previewUrl}
          onFileSelected={handleFileSelected}
          onClear={handleClear}
        />
      </div>

      <div className="card">
        <div className="card-title">2. Modèle</div>
        <div className="card-subtitle">
          Choisis un modèle entraîné, ou compare les 4 stratégies en une seule analyse.
        </div>
        <ModelSelector models={models} selected={selectedModel} onSelect={setSelectedModel} />
      </div>

      <div>
        <button className="primary-btn" disabled={!file || loading} onClick={handleAnalyze}>
          {loading ? "Analyse en cours…" : "Analyser l'échantillon"}
        </button>
      </div>

      {error && <p className="error-banner">{error}</p>}

      <ResultsPanel mode={resultMode} singleResult={singleResult} comparisonResults={comparisonResults} />
    </div>
  );
}
