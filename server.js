// server.js

const express        = require('express')
const mysql          = require('mysql')
const bodyParser     = require('body-parser');
// const db             = require('config/db.js')

const app            = express()

const port           = 8080


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//require('./app/routes')(app, {})
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'isoaccess'
  })

  con.connect(function(err) {
    if (err) return console.log(err)
    
    //require('./app/routes')(app, con);

    app.get('/', (req, res) => {
        // create your note here
        res.send('Welcome to ISO API')
    });

    app.post('/create', (req, res) => {
      // create your note here
      console.log(req.body.email)
      var email_ = req.body.email.trim()
      var amount_ = req.body.amount.trim()
      var first_name_ = req.body.first_name
      var last_name_ = req.body.last_name

      console.log(email_, first_name_, last_name_)

      // input validation
      if (email_ === "" || amount_ === "") {
        res
        .status(300)
        .send({
          error: "enrtry_invalid",
          message: "Invalid email or amount"
        })
      }

      var password_ = "$2y$10$6gzJEANs0sotSm2R9ArxwOB/Hx8rQ9nSd9ly6Od/QLcAjdIJGDitm"

      // process data into db
      var sql = "INSERT INTO users (`first_name`, `last_name`, `email`, `password`) VALUES ('"+ first_name_ +"', '"+ last_name_ +"', '"+ email_ +"', '"+ password_ +"') "
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });


      res.send('Welcome to ISO API')
    });

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  })


 