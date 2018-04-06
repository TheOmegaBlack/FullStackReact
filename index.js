const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./services/passport')

const uri = 'mongodb://localhost/react_full_stack'

mongoose.connect(uri)

const app = express()

// require returns the function in authRoutes
// it immediately executes it passing app as a parameter
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
