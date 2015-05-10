var BatteryDock = ReactMeteor.createClass({
  templateName: "BatteryDock",

  startMeteorSubscriptions: function(){
    Meteor.subscribe("Batteries");
  },

  getMeteorState: function(){
    console.log('database change');
    
    return {
      batteries: Batteries.find({}, {sort: {batteryId: 1}}).fetch()
    };
  },

  render: function(){

    // Initialize and pass battery information down to the component.
    var displayBatteries = [];
    console.log('rerrendered')
    for (var i=0; i < this.state.batteries.length; i++) {
      displayBatteries.push(<Battery info={this.state.batteries[i]} />);
    }

    return (
      <div className="BatteryDock">
        {displayBatteries}
      </div>
    );
  }
});
