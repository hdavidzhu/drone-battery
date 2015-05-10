// Servo Demo
// This code will move the servo in several directions as proof of concept
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' },
    server: { adaptor: 'mqtt', host: 'mqtt://192.168.2.1:1883' }
  },

  devices: {
    servo: { driver: 'servo', pin: 3, connection: 'edison' }
  },

  work: function(my) {
    my.server.subscribe('hello');

    my.server.on('message', function (topic, data) {
      console.log(topic + ": " + data);
    });

    var angle = 0;
    my.servo.angle(angle);
    setInterval(function(){
      angle = angle + 45;
      if(angle > 135){
          angle = 45; //reset position if servo angle is greater than 135 (i.e. 180)
      }
      my.servo.angle(angle);
      console.log("Servo Angle: "+angle);
      my.server.publish('hello', 'hi there');
    },1000);
  }

});
 
Cylon.start();