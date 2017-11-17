// server.js

const express        = require('express')
const mysql          = require('mysql')
const bodyParser     = require('body-parser');
const db             = require('./config/db.js')

const app            = express()

const port           = 8080

app.use(bodyParser.urlencoded({ extended: true }))

require('./app/routes')(app, {})
var con = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
  })

  con.connect(function(err) {
    if (err) return console.log(err)
    
    require('./app/routes')(app, con);

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  })


 