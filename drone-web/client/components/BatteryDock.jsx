var cx = React.addons.classSet;

var BatteryDock = ReactMeteor.createClass({
  templateName: "BatteryDock",

  // startMeteorSubscriptions: function(){
  //   Meteor.subscribe("batteries");
  // },

  getMeteorState: function(){
    console.log("Gettting the state.");
    return {
      // batteries: Batteries.find({}, {sort: {_id: 1}}).fetch()
      batteries: Batteries.find().count()
      // batteries: 7
    };

    // return {};
  },

  // getInitialState: function(){
  //   console.log("Gettting the state.");
  //   return {
  //     // batteries: Batteries.find({}, {sort: {_id: 1}}).fetch()
  //     batteries: Batteries.find().count()
  //     // batteries: 7
  //   };

  //   // return {};
  // },

  renderBattery: function(){
    return <Battery />;
  },

  render: function(){

    console.log("Hello!");
    console.log(this.state.batteries);

    // var displayBatteries = [];

    // for (var i=0; i < 8; i++) {
    //   displayBatteries.push(<Battery />);
    // }

    // return (
    //   <div className="Battery">
    //     {displayBatteries}
    //   </div>
    // );

    return <div></div>;
  }

});
