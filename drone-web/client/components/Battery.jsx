Battery = React.createClass({

  getInitialState: function(){

    // Converted the percentage number.
    var convertedPercentage = this.props.info.percentage * 100 / 1024;
    convertedPercentage = Math.round(convertedPercentage).toString() + '%';

    return {
      batteryId: this.props.info.batteryId,
      attached: this.props.info.attached,
      percentage: convertedPercentage
    };
  },

  render: function(){

    var chargeAmount = {
      width: this.state.percentage
    };

    return (
      <div className="Battery">
        <div className="battery-fill-amount" style={chargeAmount}></div>
        <div className="battery-nub"></div>
      </div>
    );
  }

});
