var React = require("react/addons");
var ClassSet = React.addons.classSet;

var PageReview = React.createClass({
  render: function() {
    return (
      <div className="row">
        {this.props.page.images.map(function(url) {
          return (
            <div key={url} className="col-xs-12 col-md-3">
              <a href="#" className="thumbnail">
                <img src={url}/>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = PageReview;
