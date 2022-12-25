const express = require('express');
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;
const app = express();

connectDB();

var allowedDomains = ['https://openjio.albertdev.xyz', 'https://openjio.onrender.com/'];

var corsOptions = {
    origin: function (origin, callback) {
      if (allowedDomains.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions))

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activity', require('./routes/activityRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));