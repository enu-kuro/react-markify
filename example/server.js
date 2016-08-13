var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
