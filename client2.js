var Primus = require('primus.io');

var Socket = Primus.createSocket({
  transformer: 'websockets',
  parser: 'JSON'
});

var client = new Socket('http://localhost:8080');

client.send('chat', { id: 'client2', message: 'Hi I am client 2' }, function (data) {
  console.log('[ %s ]: => %s', data.id, data.message);
});

client.on('news', function (data) {
  console.log('[ %s ][ news ]: => %s', data.id, data.message);
});