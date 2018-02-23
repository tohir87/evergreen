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
      var email_ = req.body.email.trim()
      var amount_ = req.body.amount.trim()
      var first_name_ = req.body.first_name
      var last_name_ = req.body.last_name
      var user_id

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
      con.query(sql,  (err, result) => {
        if (err) {
          res.status(500)
          .send({
            error: "sql_error",
            message: err
          })
        }else{
          console.log(result);

          // insert into student info table
          user_id = result.insertId

          var sql_student_info = "INSERT INTO students_info (`user_id`, `passport_number`, `nationality_id`, `phone_number`, `gender_id`, `dateof_birth`) VALUES ('"+ user_id +"', '"+ req.body.passport_number +"', '"+ req.body.nationality_id +"', '"+ req.body.phone_number +"', '"+ req.body.gender_id +"', '"+ req.body.dob +"') "

          con.query(sql_student_info, (err, result) => {
            if (err) {
             throw err
            }else{
              console.log("student info saved successfully")

              // send notification email to applicant
            }
          })
        }
      });

      



      res.send('Welcome to ISO API')
    });

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  })


 