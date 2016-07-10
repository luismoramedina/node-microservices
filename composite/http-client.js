var request = require('request');

var options = {
  headers: {
    'Authorization': 'Beader CCC'
  }
};

exports.persons = function(callback) {
  options.url = 'http://localhost:8081/api/persoAns/1';
  request(options, function (error, response, body) {
    handleResponse(error, response, body, callback);
  });
}

exports.accounts = function(callback) {
  options.url = 'http://localhost:8082/api/accounts/1';
  request(options, function (error, response, body) {
    handleResponse(error, response, body, callback);
  });
}

function handleResponse(error, response, body, callback) {
  if (!error && response.statusCode == 200) {
    callback(null, body);
  } else {
    if (!error) {
      error = new Error({'statusCode' : response.statusCode});
    }
    callback(error);
  }
}
