const express = require('express');
const cors = require('cors');
const multer = require('multer');
const apiRoutes = require('./routes/api');

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload=multer({dest: 'uploads/'});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});