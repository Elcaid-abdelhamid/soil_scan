import { useRef, useState } from "react";

export default function ImageDropzone({ file, previewUrl, onFileSelected, onClear }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(fileList) {
    const f = fileList?.[0];
    if (f && f.type.startsWith("image/")) {
      onFileSelected(f);
    }
  }

  if (file && previewUrl) {
    return (
      <div className="preview-wrap">
        <img src={previewUrl} alt="Échantillon de sol sélectionné" className="preview-img" />
        <div className="preview-meta">
          <span className="preview-filename">{file.name}</span>
          <span className="model-option-tag">{(file.size / 1024).toFixed(0)} Ko</span>
          <button type="button" className="link-btn" onClick={onClear}>
            Choisir une autre image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`dropzone ${dragging ? "dragging" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <div className="dropzone-icon">⛏️</div>
      <div className="dropzone-text">
        <strong>Clique pour choisir</strong> ou dépose une photo d'échantillon de sol ici
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
