import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import DataTable from "../components/DataTable";
import DownloadCSV from "../components/DownloadCSV";
import { uploadServiceAccount, fetchData } from "../services/api";

export default function AdminPage() {
  const [data, setData] = useState([]);
  const [collection, setCollection] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleFileSelected = async (file) => {
    setLoading(true);
    try {
      await uploadServiceAccount(file, 'firebase');
      setIsConnected(true);
      showAlert('Service account uploaded successfully! 🎉', 'success');
    } catch (error) {
      showAlert('Error uploading file: ' + error.message, 'error');
    }
    setLoading(false);
  };

  const handleFetchData = async () => {
    if (!collection) {
      showAlert('Please enter a collection name', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetchData(collection);
      setData(response.data);
      showAlert(`Fetched ${response.data.length} records from ${collection}`, 'success');
    } catch (error) {
      showAlert('Error fetching data: ' + error.message, 'error');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="admin-container">
        {alert && (
          <div className={`alert ${alert.type}`}>
            {alert.message}
          </div>
        )}

        <div className="card">
          <h2 className="card-title">Database Connection</h2>
          <FileUpload onFileSelected={handleFileSelected} />
          {isConnected && (
            <div className="alert success" style={{ marginTop: '1rem' }}>
              Connected to database
            </div>
          )}
        </div>

        {isConnected && (
          <div className="card">
            <h2 className="card-title">Fetch Data</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter collection name (e.g., users)"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFetchData()}
              />
              <button onClick={handleFetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data'}
              </button>
            </div>
          </div>
        )}

        {data.length > 0 && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{data.length}</div>
                <div className="stat-label">Total Records</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{Object.keys(data[0] || {}).length}</div>
                <div className="stat-label">Fields</div>
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="card-title">Data Preview</h2>
                <DownloadCSV data={data} filename={`${collection}.csv`} />
              </div>
              <DataTable data={data} />
            </div>
          </>
        )}

        {!loading && data.length === 0 && isConnected && (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-text">No Data Yet</div>
              <div className="empty-state-subtext">
                Enter a collection name and click "Fetch Data" to view records
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="card">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </>
  );
}