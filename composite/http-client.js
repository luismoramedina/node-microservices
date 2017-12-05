var request = require('request');

var options = {
  headers: {
    'Authorization': 'Bearer CCC'
  }
};

exports.persons = function(callback) {
  options.url = 'http://persons:8081/api/persons/1';
  console.log("url: ", options.url);
  request(options, function(error, response, body) {
    handleResponse(error, response, body, callback);
  });
}

exports.accounts = function(callback) {
  options.url = 'http://accounts:8082/api/accounts/?dni=1';
  console.log("url: ", options.url);
  request(options, function(error, response, body) {
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
