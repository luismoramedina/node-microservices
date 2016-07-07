var express = require('express');
var bodyParser = require('body-parser');

var express = require('express')();

express.get('/api/accounts/:personid', function(req, res, next) {
    res.json([{
        accountId: 1,
        dni: 1,
        balance: 3000,
        number: 1
    }]);    
});

express.listen(8082);