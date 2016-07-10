var cli = require('./http-client');

cli.persons(function(data) {
   console.log(data);
});