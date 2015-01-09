var Primus = require('primus.io');
var http = require('http');
var fs = require('fs');
var port = 8080;
var count = 0;

var server = http.createServer(function server(req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(__dirname + '/index.html').pipe(res);
});

// Primus server.
var primus = new Primus(server, {
  transformer: 'websockets',
  parser: 'JSON'
});

// Listen for new connections.
primus.on('connection', function connection(spark) {

  console.log('connection %s', spark.id);

  spark.on('chat', function (data, fn) {
    console.log('[ %s ]: => %s', data.id, data.message);
    fn({ id: 'server', message: 'hi from server' })
  });

});

// Listen for disconnections.
primus.on('disconnection', function (spark) {
  console.log('disconnecting %s', spark.id);
});

// Broadcast message every 3 seconds.
setInterval(broadcast, 3000);

// Broadcast message
function broadcast() {
  primus.send('news', { id: 'server', message: 'News message #' + (count++) });
}

// Start server listening
server.listen(port, function(){
  console.log('\033[96mlistening on localhost:' + port +' \033[39m');
});
