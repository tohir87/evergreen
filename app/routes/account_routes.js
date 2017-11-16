// routes/account_routes.js
module.exports = function(app, db) {
    app.post('/signup', (req, res) => {
        // create your note here
        console.log(req.body)
        var data_ = {email : req.body.email, password : req.body.password}
        res.send('sign up completed')
    });

    app.post('/login', (req, res) => {
        // create your note here
        res.send('login successful')
    });

    app.post('/forgot_password', (req, res) => {
        // create your note here
        res.send('A password reset has been sent to your email')
    });

    app.post('/login_with_receipt', (req, res) => {
        // create your note here
        res.send('Access granted')
    });
};