import React from "react";

function convertToCSV(data) {
  if (!data || data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(field => JSON.stringify(row[field] ?? "")).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export default function DownloadCSV({ data, filename = "data.csv" }) {
  const handleDownload = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button 
      className="download"
      onClick={handleDownload} 
      disabled={!data || data.length === 0}
    >
      Download CSV
    </button>
  );
}