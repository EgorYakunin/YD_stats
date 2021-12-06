const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 6969

// Define path for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting up static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        author: 'Yakunin Egor'
    })
})

app.get('/client', (req, res) => {
    const usersIp = req.socket.remoteAddress
    res.render('client', {
        author: 'Yakunin Egor',
        usersIp: usersIp
    })
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