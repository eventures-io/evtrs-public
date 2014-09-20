'use strict';

var express = require('express');
var app = express();
//var mongoose = require('mongoose');

/**
 * Main application file
 */

// Set defaul to node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// configuration =================

//mongoose.connect('mongodb://node:node@localhost:27017/evtrs');

require('./lib/config/express')(app);
require('./lib/routes')(app);


// define model =================
//var Test = mongoose.model('testData', {
//    name: String
//});




// Start server
app.listen(config.port, config.ip, function () {
    console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
})

app.get('/', function(req, res){


    console.log("----in root");
    return res;

});

app.route('/api/test')
    .get(function (req, res) {
        console.log("---in get");
        // use mongoose to get all todos in the database
        Test.find(function (err, test) {
            console.log('---in find');
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err)
            } else {
                res.json(test); // return all todos in JSON format
            }
        });
    });




