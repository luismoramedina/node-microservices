var express = require('express')();
var bodyParser = require('body-parser');
var client = require('./http-client');


express.use(bodyParser.json());

var requestCount = 0;

express.use(function(req, res, next) {
   requestCount++;
   console.log('requestCount', requestCount);
   next();
});


function compose(callback, err_callback) {
   client.persons(function(err_p, personsdata) {
      client.accounts(function(err_a, accountsdata) {
         if (err_a || err_p) {
            err_callback(err_a || err_p);
         } else {
            var persons = JSON.parse(personsdata);
            var accounts = JSON.parse(accountsdata);
            persons.accounts = accounts;
            callback(JSON.stringify(persons));
         }
      });
   });
}

express.get('/api/clients/:id', function(req, res, next) {
   compose(function(data) {
      console.log('send response!');
      res.send(data);
   }, function(err) {
      console.log('err', err);
      res.status(500).send('error on services');
   });
});

express.listen(8080);