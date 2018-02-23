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

      var user_data = {
        first_name : first_name_,
        last_name : last_name_,
        email : email_,
        password : password_
      }

      // process data into db
      con.query("INSERT INTO users SET ?", user_data,  (err, result) => {
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

          var student_data = {
            user_id : result.insertId,
            passport_number : req.body.passport_number,
            nationality_id : req.body.nationality_id,
            phone_number : req.body.phone_number,
            gender_id : req.body.gender_id,
            dateof_birth : req.body.dob
          }

          con.query("INSERT INTO students_info SET ?", student_data, (err, result) => {
            if (err) {
             throw err
            }else{
              console.log("student info saved successfully")

              // send notification email to applicant
            }
          })
        }
      });


      res.status(200)
      .send({
        status : "OK",
        mmessage : "Operation completed successfully"
      })
    });

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  })


 