const API_URL = 'http://localhost:5000/api';

export async function uploadServiceAccount(file, dbType) {
  const formData = new FormData();
  formData.append('serviceAccount', file);
  formData.append('dbType', dbType);

  const response = await fetch(`${API_URL}/upload-config`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}

export async function fetchData(collection) {
  const response = await fetch(`${API_URL}/fetch-data?collection=${collection}`);
  return response.json();
}