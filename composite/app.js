var express = require('express')();
var bodyParser = require('body-parser');
var async = require('async');

var client = require('./http-client');


express.use(bodyParser.json());

var requestCount = 0;

express.use(function(req, res, next) {
   requestCount++;
   console.log('requestCount', requestCount);
   next();
});

function compose(callback, err_callback) {

   async.parallel({
      persons: function(callback) {
         client.persons(function(err_p, personsdata){
            callback(err_p, personsdata);
         });
      },
      accounts: function(callback) {
         client.accounts(function(err_a, accountsdata){
            callback(err_a, accountsdata);
         });
      }
   },
   function(err, results) {
      // results ---> {persons: {}, accounts: {}}
      console.log(err);
      if (err) {
         err_callback(err);
      } else {
         var persons = JSON.parse(results.persons);
         persons.accounts = JSON.parse(results.accounts);
         callback(JSON.stringify(persons));
      }
   });
}

express.get('/api/clients/:id', function(req, res) {
   compose(function(data) {
      console.log('send response!');
      res.send(data);
   }, function(err) {
      console.log('err', err);
      res.status(500).send('error on services');
   });
});

express.listen(8080);