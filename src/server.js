const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 6969

// Define path for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const UsersSession = require('./models/Users_session.js')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting up static directory
app.use(express.static(publicDir))

let us = new UsersSession()
let sessions = []

app.get('', (req, res) => {
    res.render('index')
})

app.get('/get-data', (req, res) => {

    res.send(
        sessions
    )
})

app.get('/client', (req, res) => {

    us.set_user_ip(req.socket.remoteAddress)
    us.set_start_time()

    res.status(200).send()
})

app.get('/client-exit', (req, res) => {
    us.set_end_time()
    sessions.push(us)

    res.status(200).send()
})

app.get('/json', (req, res) => {
    res.send([
        {
            name: 'Andrew',
            age: "27"
        },
        {
            name: 'Sarah',
            age: "20"
        }
    ])
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})