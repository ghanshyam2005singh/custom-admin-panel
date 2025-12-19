const admin = require('firebase-admin');
let db = null;

async function connectDatabase(dbType, configPath) {
  if (dbType === 'firebase') {
    const serviceAccount = require(`../${configPath}`);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
  }
  // TODO: Add AWS and GCP connections
}

async function fetchData(collectionName) {
  if (!db) throw new Error('Database not connected');
  
  const snapshot = await db.collection(collectionName).get();
  const data = [];
  snapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

module.exports = { connectDatabase, fetchData };