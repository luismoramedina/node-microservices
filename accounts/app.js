var express = require('express');
var bodyParser = require('body-parser');

var express = require('express')();

express.get('/api/accounts', function(req, res) {
   console.log('gs-auth-token: ', req.get('GS-AUTH-TOKEN'));
   console.log('dni: ', req.query.dni);

    res.json([{
        accountId: 1,
        dni: 1,
        balance: 3000,
        number: 1
    }]);    
});

express.listen(8082);