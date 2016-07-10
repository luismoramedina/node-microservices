var request = require('request');

var options = {
  headers: {
    'Authorization': 'Beader CCC'
  }
};

exports.persons = function(callback) {
  options.url = 'http://localhost:8081/api/persons/1';
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    } else {
      console.log(response.statusCode);
    }
  });
}

exports.accounts = function(callback) {
  options.url = 'http://localhost:8082/api/accounts/1';
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    } else {
      console.log(response.statusCode);
    }
  });
}
