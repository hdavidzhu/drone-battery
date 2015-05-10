// Servo Demo
// This code will move the servo in several directions as proof of concept
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    edison: { adaptor: 'intel-iot' },
    server: { adaptor: 'mqtt', host: 'mqtt://softlayer.dewan.us:1883' }
  },

  devices: {
    servo: { driver: 'servo', pin: 3, connection: 'edison' },
    sensor: { driver: 'ir-range-sensor', pin: 0, model: 'gp2y0a41sk0f' }
  },

  work: function(my) {
    var angle = 50;
    var connected = true;
    var same = false;
    var charge = 600;
    my.servo.angle(angle);
    setInterval(function(){
      var range = my.sensor.range();
      if(range <=3 && range > 0 && same == false) {
        same = true;
        if (connected == true) {
          angle = 120;
          connected = false;
        }
        else {
          angle = 50;
          connected = true;
          charge = 100;
        }
      }
      else if(range <=3 && range > 0) {}
      else {
        same = false;
      }
      my.servo.angle(angle);
      charge = charge + 50;
      if(charge >=1023 ) charge = 1022;
      console.log('Range ===>', range);
      console.log("Servo Angle: "+angle);
      console.log('same?'+same);
      my.server.publish('status', connected+','+charge);
    },1000);
  }

});
 
Cylon.start();