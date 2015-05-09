var BatteryDock = ReactMeteor.createClass({
  mixins: [ReactMeteor.Mixin],
  templateName: "BatteryDock",

  startMeteorSubscriptions: function(){
  },

  getMeteorState: function(){
    return {
    };
  },

  renderBattery: function(){
    return <Battery />;
  },

  render: function(){

    var batteries = [];

    for (var i=0; i < 8; i++) {
      batteries.push(<Battery />);
    }

    return (
      <div className="Battery">
        {batteries}
      </div>
    );
  }

});
