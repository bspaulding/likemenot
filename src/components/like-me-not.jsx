var React = require("react/addons");
var ClassSet = React.addons.classSet;
var PageStore = require("../stores/page-store.js");
var PageReview = require("./page-review.jsx");
var PageLiker = require("./page-liker.jsx");

var pluralize = function(n, singular, plural) {
  return [n, (n === 1 ? singular : plural)].join(' ');
};

var LikeMeNot = React.createClass({
  getInitialState: function() {
    var pages = PageStore.all();
    return { pages: pages, currentPage: pages[0] };
  },

  componentWillMount: function() {
    PageStore.addChangeListener(this.pageStoreChanged);
  },
  componentDidUnMount: function() {
    PageStore.removeChangeListener(this.pageStoreChanged);
  },
  pageStoreChanged: function() {
    var pages = PageStore.all();
    var currentPage = !!this.state.currentPage ? pages.find(function(page) { return page.id === this.state.currentPage.id; }.bind(this)) : pages[0];
    this.setState({ pages: pages, currentPage: currentPage });
  },

  like: function() {
    PageStore.like(this.state.currentPage.id);
  },
  dislike: function() {
    PageStore.dislike(this.state.currentPage.id);
  },

  currentIndex: function() {
   return this.state.pages.indexOf(this.state.currentPage);
  },

  previousPage: function(event) {
    if (event.target.parentElement.classList.contains("disabled")) { return false; }

    this.setState({ currentPage: this.state.pages[this.currentIndex()-1] });
  },
  nextPage: function(event) {
    if (event.target.parentElement.classList.contains("disabled")) { return; }

    this.setState({ currentPage: this.state.pages[this.currentIndex()+1] });
  },

  render: function() {
    var cindex = this.currentIndex();
    var nextEnabled = cindex < this.state.pages.length - 1;
    var prevEnabled = cindex > 0;

    var previousButtonClass = ClassSet({ "disabled": !prevEnabled });
    var nextButtonClass = ClassSet({ "disabled": !nextEnabled });

    var likeButtonsStyle = { textAlign: "right", marginBottom: 20 };
    var navStyle = { textAlign: "center" };
    var navButtonStyle = { cursor: "pointer" };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h1>Like Me Not?</h1>
            <span>{pluralize(this.state.pages.length, "thing", "things")} to like</span>
          </div>
          <div className="col-xs-12" style={navStyle}>
            <nav>
              <ul className="pagination">
                <li className={previousButtonClass} onClick={this.previousPage} style={navButtonStyle}>
                  <span aria-hidden="true">Previous</span>
                </li>
                <li className={nextButtonClass} onClick={this.nextPage} style={navButtonStyle}>
                  <span aria-hidden="true">Next</span>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-xs-12" style={likeButtonsStyle}>
            {this.state.currentPage ? <PageLiker like={this.like} dislike={this.dislike} isLiked={this.state.currentPage.isLiked}/> : ''}
          </div>
        </div>
        {this.state.currentPage ? <PageReview page={this.state.currentPage}/> : ''}
      </div>
    );
  }
});

module.exports = LikeMeNot;
