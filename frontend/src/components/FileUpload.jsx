import React, { useRef, useState } from "react";

export default function FileUpload({ onFileSelected }) {
  const fileInput = useRef();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div className="upload-section">
      <input
        type="file"
        accept=".json"
        ref={fileInput}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="file-input-label">
        Upload Service Account
      </label>
      {fileName && (
        <div className="file-info">
          Selected: <strong>{fileName}</strong>
        </div>
      )}
    </div>
  );
}