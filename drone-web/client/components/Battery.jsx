Battery = React.createClass({
  mixins: [ReactMeteor.Mixin],

  startMeteorSubscriptions: function(){
    Meteor.subscribe("batteries");
  },

  getMeteorState: function(){
    return {
      battery: Batteries.findOne({_id: this.props.info._id}, {sort: {batteryId: 1}})
    }
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

    console.log(this.state);

    var batteryPercentage = this.state.battery.percentage;
    batteryPercentage = Math.floor(batteryPercentage * 100 / 1024).toString() + '%';
    console.log(batteryPercentage);

    var chargeAmount = {
      width: batteryPercentage
    };

    var attachedStatus = this.state.battery.attached;
    var attachedStatusMsg = batteryPercentage;
    if (!this.state.battery.attached) {
      attachedStatusMsg = "Detached.";
      chargeAmount = {
        width: "100%",
        backgroundColor: "#F44336"
      }
    }

    return (
      <div className="Battery">
        <div className="battery-fill-amount" style={chargeAmount}></div>
        <div className="battery-nub"></div>
        <div className="battery-number">{this.state.battery.batteryId}</div>
        <div className="ripple" onClick={_this.ripple}>{attachedStatusMsg}</div>
      </div>
    );
  }
});
