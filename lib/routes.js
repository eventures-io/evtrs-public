'use strict';

//TODO check name: controllers. It's confusing because these are not application controllers but server config
var index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);

  app.route('/')
    .get( index.index);

    app.route('/*')
        .get( index.fourofour);
};