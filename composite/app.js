var express = require('express')();
var bodyParser = require('body-parser');
var client = require('./http-client');

express.use(bodyParser.json());

function compose(callback, err_callback) {
   client.persons(function(personsdata, err_p) {
      client.accounts(function(accountsdata, err_a) {
         if (err_a || err_p 
            || !accountsdata || !personsdata) {
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
      console.log(err);
      res.status(500).send('error on services');
   });
});

express.listen(8080);