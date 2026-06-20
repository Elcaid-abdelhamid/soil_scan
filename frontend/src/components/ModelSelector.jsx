const COMPARE_ALL = "__compare_all__";

export default function ModelSelector({ models, selected, onSelect }) {
  return (
    <div className="model-grid">
      {models.map((m) => (
        <div
          key={m.key}
          className={`model-option ${selected === m.key ? "selected" : ""}`}
          onClick={() => onSelect(m.key)}
        >
          <div className="model-option-label">{m.label}</div>
          <div className="model-option-tag">{m.shortLabel}</div>
        </div>
      ))}

      <div
        className={`model-option ${selected === COMPARE_ALL ? "selected" : ""}`}
        onClick={() => onSelect(COMPARE_ALL)}
      >
        <div className="model-option-label">Comparer les 4 modèles</div>
        <div className="model-option-tag">une prédiction par modèle</div>
      </div>
    </div>
  );
}

export { COMPARE_ALL };
