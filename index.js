if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose')
const express = require('express')
const router = require('./router')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view-engine', 'ejs')

app.use('/', router)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT))
  .then(() => console.log('Listening...'))
  .catch(err => console.log(err));