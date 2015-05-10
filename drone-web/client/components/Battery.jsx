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

  ripple: function(event){

    var thisDOM = this.getDOMNode();

    var $div = $('<div/>');
    var btnOffset = $(thisDOM).offset();
    var xPos = event.pageX - btnOffset.left;
    var yPos = event.pageY - btnOffset.top;
    
    $div.addClass('ripple-effect');
    var $ripple = $(".ripple-effect");

    $ripple.css("height", $(thisDOM).height());
    $ripple.css("width", $(thisDOM).height());

    $div
      .css({
        top: yPos - ($ripple.height()/2),
        left: xPos - ($ripple.width()/2),
        background: $(event.target).data("ripple-color")
      }) 
      .appendTo($(thisDOM).children().last());

    window.setTimeout(function(){
      $div.remove();
    }, 2000);
  },

  render: function(){
    var _this = this;

    var chargeAmount = {
      width: this.state.percentage
    };

    var attachedStatus = this.state.percentage;
    if (!this.state.attached) {
      attachedStatus = "Detached.";
      chargeAmount = {
        width: "100%",
        backgroundColor: "#F44336"
      }
    }

    return (
      <div className="Battery">
        <div className="battery-fill-amount" style={chargeAmount}></div>
        <div className="battery-nub"></div>
        <div className="battery-number">{this.state.batteryId}</div>
        <div className="ripple" onClick={_this.ripple}>{attachedStatus}</div>
      </div>
    );
  }
});
