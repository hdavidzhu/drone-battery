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

  // Meteor.publish("batteries", function() {
  //   return Batteries.find();
  // });
}
