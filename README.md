# Custom Admin Panel

A flexible admin panel system that allows you to connect to any database (Firebase, AWS, GCP) using service account credentials and manage data through a clean web interface.

## Features

- 🔐 **Dynamic Database Connection**: Upload service account JSON to connect to Firebase, AWS, or GCP databases
- 📊 **Data Visualization**: View all collections/tables with support for text and images
- 📥 **CSV Export**: Download any collection data as CSV file
- 🔄 **Multi-Database Support**: Works with Firebase, AWS DynamoDB, and GCP Firestore
- 🎨 **Clean UI**: Simple and intuitive admin interface

## Project Structure

```
custom-admin-pannel/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── DataTable.jsx
│   │   │   └── DownloadCSV.jsx
│   │   ├── pages/         # Page components
│   │   │   └── AdminPage.jsx
│   │   ├── services/      # API integration
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
│
└── backend/               # Node.js backend
    ├── controllers/       # Business logic
    │   └── dbController.js
    ├── routes/           # API routes
    │   └── api.js
    ├── uploads/          # Temporary file storage
    ├── server.js         # Entry point
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Service account JSON file for your database (Firebase/AWS/GCP)

## Installation

### Backend Setup

```bash
cd backend
npm install
```

**Install dependencies:**
```bash
npm install express multer cors dotenv firebase-admin aws-sdk @google-cloud/firestore
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Configuration

### Backend (.env file)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
```

## Running the Application

### Start Backend

```bash
cd backend
node server.js
```

Backend will run on `http://localhost:5000`

### Start Frontend

```bash
cd frontend
npm start
```

Frontend will run on `http://localhost:3000`

## Usage

1. **Upload Service Account**
   - Click "Upload Service Account" button
   - Select your service account JSON file
   - Choose database type (Firebase/AWS/GCP)

2. **Fetch Data**
   - Enter collection/table name
   - Click "Fetch Data" to retrieve records

3. **View Data**
   - Browse through the data table
   - Images are automatically displayed if URLs are detected

4. **Export Data**
   - Click "Download CSV" to export current data

## API Endpoints

### POST `/api/upload-config`
Upload service account configuration file
- **Body**: `multipart/form-data`
  - `serviceAccount`: JSON file
  - `dbType`: String ('firebase', 'aws', 'gcp')

### GET `/api/fetch-data`
Fetch data from a collection/table
- **Query**: `collection` (string)

## Supported Databases

- ✅ **Firebase Firestore**
- 🚧 **AWS DynamoDB** (Coming soon)
- 🚧 **GCP Firestore** (Coming soon)

## Security Notes

⚠️ **Important**: This is a development tool. Do not expose this admin panel publicly without proper authentication and security measures.

- Service account files contain sensitive credentials
- Implement authentication before production use
- Use environment variables for sensitive data
- Add rate limiting and input validation

## Future Enhancements

- [ ] User authentication
- [ ] Support for more databases (MongoDB, PostgreSQL)
- [ ] Real-time data updates
- [ ] Advanced filtering and search
- [ ] Data editing capabilities
- [ ] Bulk operations
- [ ] Role-based access control

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License