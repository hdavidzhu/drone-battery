var mosca = Meteor.npmRequire('mosca')

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',        
  url: 'mongodb://localhost/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost/mqtt'
  }
};

var server = new mosca.Server(moscaSettings);

server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);     
});

// fired when a message is received
server.on('published', Meteor.bindEnvironment(function(packet, client) {
  var msg = packet.payload.toString();
  console.log('Published', msg);
  var msgdata = msg.split(",");
  if(msgdata[1] != null) {
    Batteries.upsert({batteryId: 0}, {batteryId: 0, percentage: JSON.parse(msgdata[1]), attached: JSON.parse(msgdata[0])});
  } 
}));

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}




// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Batteries.find().count() === 0) {
      var batteryStock = 4;
      var batteryNumbers = new Array(batteryStock);

      for(var i = 0; i < batteryNumbers.length; i++){
        batteryNumbers[i] = i;
        
        Batteries.insert({
          batteryId: i,
          percentage: 1024*Math.random(),
          attached: true
        })
      }
    }
  });

  Meteor.publish("batteries", function() {
    return Batteries.find();
  });
}
