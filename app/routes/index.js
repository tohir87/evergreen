// routes/index.js

const noteRoutes = require('./note_routes')
const accountRoutes = require('./account_routes')
const resourceRoutes = require('./resource_routes')

module.exports = function(app, db){
    // console.log('from index', db)
    noteRoutes(app, db)
    accountRoutes(app, db)
    resourceRoutes(app, db)
}