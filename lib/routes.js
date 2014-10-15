'use strict';

var index = require('./controllers');

/**
 * Application routes
 */
module.exports = function (app) {

    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

    app.route('/partials/*')
        .get(index.partials);

    app.route('/')
        .get(index.index);

    app.route('/about')
        .get(index.index);

    app.route('/contact')
        .get(index.index);

    app.route('/google05176910c8c39725.html')
       .get(index.goggle);

    app.route('/*')
        .get(index.fourofour);

    app.route('/api/contact')
        .post(index.contact);

};