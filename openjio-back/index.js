const express = require('express');
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/activity', require('./routes/activityRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));