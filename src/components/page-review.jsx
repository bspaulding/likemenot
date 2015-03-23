var React = require("react/addons");
var ClassSet = React.addons.classSet;

var PageReview = React.createClass({
  render: function() {
    return (
      <div className="row">
        {this.props.page.images.map(function(url) {
          return (
            <div key={url} className="col-xs-12 col-md-3">
              <span href="#" className="thumbnail">
                <img src={url}/>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = PageReview;
