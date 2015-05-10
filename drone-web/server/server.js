var mosca = Meteor.npmRequire('mosca')

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',        
  url: 'mongodb://localhost:3001/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:3001/mqtt'
  }
};

var server = new mosca.Server(moscaSettings);

server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);     
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload.toString);
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}




// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  console.log("Yo");
  Meteor.startup(function () {
    console.log("Yo");
    if (Batteries.find().count() === 0) {
      
      var batteryStock = 5;
      var batteryNumbers = new Array(batteryStock);

      for(var i = 0; i < batteryNumbers.length; i++){
        batteryNumbers[i] = i;
        
        Batteries.insert({
          batteryId: i,
          percentage: 1024,
          attached: true
        })
      }
    }
  });

  Meteor.publish("batteries", function() {
    return Batteries.find();
  });
}
