// config/db.js
module.exports = {
    host        : 'localhost',
    port        : 3306,
    user        : 'root',
    password    : 'root',
    database    : 'oshc' 
  };

  exports.  = function(callback) {
    var sql = "SELECT * FROM countries";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
      if(err) { console.log(err); callback(true); return; }
      // make the query
      connection.query(sql, function(err, results) {
        connection.release();
        if(err) { console.log(err); callback(true); return; }
        callback(false, results);
      });
    });
  };