require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(cors());
app.use(express.json())

const quizRouter = require('./routes/quizes')
app.use('/quizes', quizRouter)

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server started, listening to port ${port}`));