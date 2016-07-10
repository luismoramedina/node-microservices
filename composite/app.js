var express = require('express')();
var bodyParser = require('body-parser');
var client = require('./http-client');

express.use(bodyParser.json());

function compose(callback) {
   client.persons(function(personsdata) {
      client.accounts(function(accountsdata) {
         console.log(personsdata);
         console.log(accountsdata);
         var persons = JSON.parse(personsdata);
         var accounts = JSON.parse(accountsdata);
         persons.accounts = accounts;
         callback(JSON.stringify(persons));
      });
   });
}

express.get('/api/clients/:id', function(req, res, next) {
   compose(function(data) {
      console.log('send response!');
      res.send(data);
   });
});

express.listen(8080);