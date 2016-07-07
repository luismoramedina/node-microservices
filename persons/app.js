var express = require('express');
var bodyParser = require('body-parser');

var express = require('express')();

express.use(bodyParser.json());

//security middleware
express.use(function (req, res, next) {
   if (!req.get('Authorization')) {
      res.status(401).send('Authentication required');
      return;
   }
   next();
});

express.get('/api/persons/:personid', function(req, res, next) {
    res.json({
        dni: req.params.personid,
        name: 'Luis',
        address: 'Rafael bergamin, madrid'
    });    
});

express.post('/api/persons', function(req, res, next) {
    res.send(req.body);
});

express.listen(8081);