// routes/resource_routes.js
module.exports = function(app, db) {
    app.get('/resource/countries', (req, res, next) => {
        res.send('coming soon')
        // next()
    });
    function next(){
        db.query("SELECT * FROM countries", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    }
};

