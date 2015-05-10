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

    // Converted the percentage number.
    var convertedPercentage = this.props.info.percentage * 100 / 1024;
    convertedPercentage = Math.round(convertedPercentage).toString();

    return {
      batteryId: this.props.info.batteryId,
      attached: this.props.info.attached,
      percentage: convertedPercentage
    };
  },

  render: function(){

    // TODO: Make this variable considering the input.
    var chargeAmount = {
      width: '90%'
    };

    return (
      <div className="Battery">
        <div className="battery-fill-amount" style={chargeAmount}></div>
        <div className="battery-nub"></div>
      </div>
    );
  }

});
