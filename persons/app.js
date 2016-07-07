var express = require('express');
var bodyParser = require('body-parser');

var express = require('express')();

express.use(bodyParser.json());

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