require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// test API
app.get('/test', (req, res) => {
    res.status(200).send({message: 'Server is running', status: res.statusCode})
})

// Import routes
const userRoute = require('./src/routes/userRoute');
app.use('/user', userRoute);