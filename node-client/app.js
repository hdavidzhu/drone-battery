// Servo Demo
// This code will move the servo in several directions as proof of concept
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' },
    server: { adaptor: 'mqtt', host: 'mqtt://192.168.2.1:1883' }
  },

  devices: {
    servo: { driver: 'servo', pin: 3, connection: 'edison' },
    sensor: { driver: 'ir-range-sensor', pin: 0, model: 'gp2y0a41sk0f' }
  },

  work: function(my) {
    var angle = 0;
    var connected = false;
    var charge = 600;
    my.servo.angle(angle);
    setInterval(function(){
      angle = angle + 45;
      if(angle > 135){
          angle = 45; //reset position if servo angle is greater than 135 (i.e. 180)
      }
      my.servo.angle(angle);
      var range = my.sensor.range();
      console.log('Range ===>', range);
      console.log("Servo Angle: "+angle);
      my.server.publish('status', connected+','+charge);
    },1000);
  }

});
 
Cylon.start();