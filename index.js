require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const menu = require('./src/route/menu');
const chineese = require('./src/route/chineese');

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());


app.use('/api/v1', menu);
app.use('/api/v1', chineese);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONO_URL);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

connectDB();


app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});


app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
});
