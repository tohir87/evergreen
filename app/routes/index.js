// routes/index.js

const noteRoutes = require('./note_routes')
const accountRoutes = require('./account_routes')
const resourceRoutes = require('./resource_routes')

module.exports = function(app, db){
    noteRoutes(app, db)
    accountRoutes(app, db)
    resourceRoutes(app, db)
}