'use strict';

var path = require('path');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      console.log("Error rendering partial '" + requestedView + "'\n", err);
      res.status(404);
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

exports.index = function(req, res) {
  res.render('index');
};

exports.goggle = function(req, res) {
    res.render('google05176910c8c39725');
};

exports.fourofour = function(req, res) {
    res.render('404');
};

exports.contact = function (req, res) {

  console.log('post received : ' + req.param('name') + ' & ' + req.param('email'));
    var response = {
        status  : 'success',
        message : 'Mail Sent Successfully'
        };

  res.status(200);
  res.json(response);

};
