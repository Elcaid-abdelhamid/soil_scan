import { useState } from "react";
import StrataLegend from "./components/StrataLegend";
import PredictPage from "./pages/PredictPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [tab, setTab] = useState("predict");

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="eyebrow">Classification des types de sols</div>
        <h1 className="site-title">SoilScan</h1>
        <p className="site-subtitle">
          Identifie le type d'un sol à partir d'une photo, grâce aux modèles EfficientNetB0 et
          ResNet50 entraînés par transfer learning et fine-tuning.
        </p>
        <StrataLegend />
      </header>

      <nav className="tab-nav">
        <button className={`tab-btn ${tab === "predict" ? "active" : ""}`} onClick={() => setTab("predict")}>
          Prédiction
        </button>
        <button className={`tab-btn ${tab === "dashboard" ? "active" : ""}`} onClick={() => setTab("dashboard")}>
          Tableau de bord
        </button>
      </nav>

      {tab === "predict" ? <PredictPage /> : <DashboardPage />}

      <footer className="site-footer">SoilScan — interface du projet de classification des sols</footer>
    </div>
  );
}
