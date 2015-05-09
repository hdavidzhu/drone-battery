Battery = ReactMeteor.createClass({
  mixins: [ReactMeteor.Mixin],
  // templateName: "Battery",

  // startMeteorSubscriptions: function(){
  // },

  // getMeteorState: function(){
  //   return {
  //   };
  // },

  getInitialState: function(){
    return {};
  },

  render: function(){
    return (
      <div className="Battery">
        <div className="battery-fill-amount"></div>
        <div className="battery-nub"></div>
      </div>
    );
  }

});
