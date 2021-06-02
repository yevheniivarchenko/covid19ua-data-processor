const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://zhenka:super2281488@cluster0.jn4dr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority?authSource=admin', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log('The server is starting...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()

module.exports = app
