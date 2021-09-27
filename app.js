const express = require('express')
const connection = require('./db-config.js')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/index')

const port = process.env.PORT || 3000

app.use(express.json())

connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack)
    } else {
        console.log('connected as id ' + connection.threadId)
    }
})
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/member', routes.member)

app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});