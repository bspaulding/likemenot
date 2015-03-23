var React = require("react/addons");
var ClassSet = React.addons.classSet;

var PageLiker = React.createClass({
  render: function() {
    var buttonIconStyle = { marginRight: 10 };
    var thumbsUpButtonClasses = ClassSet({
      "btn btn-lg": true,
      "btn-default": typeof this.props.isLiked === 'undefined' || !this.props.isLiked,
      "btn-success": typeof this.props.isLiked !== 'undefined' && this.props.isLiked
    });
    var thumbsDownButtonClasses = ClassSet({
      "btn btn-lg": true,
      "btn-default": typeof this.props.isLiked === 'undefined' || this.props.isLiked,
      "btn-danger": typeof this.props.isLiked !== 'undefined' && !this.props.isLiked
    });
    return (
      <div>
        <button className={thumbsUpButtonClasses} onClick={this.props.like}>
          <span className="glyphicon glyphicon-thumbs-up" style={buttonIconStyle} aria-hidden="true"></span>
          I Like It!
        </button>
        <button className={thumbsDownButtonClasses} onClick={this.props.dislike} style={buttonIconStyle}>
          <span className="glyphicon glyphicon-thumbs-down" style={buttonIconStyle} aria-hidden="true"></span>
          Meh.
        </button>
      </div>
    );
  }
});

module.exports = PageLiker;


