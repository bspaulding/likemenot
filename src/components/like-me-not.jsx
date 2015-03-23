var React = require("react");
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

  previousPage: function() {
    this.setState({ currentPage: this.state.pages[this.currentIndex()-1] });
  },
  nextPage: function() {
    this.setState({ currentPage: this.state.pages[this.currentIndex()+1] });
  },

  render: function() {
    var cindex = this.currentIndex();
    var nextEnabled = cindex < this.state.pages.length - 1;
    var prevEnabled = cindex > 0;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1>LikeMeNot</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <span>{pluralize(this.state.pages.length, "thing", "things")} to like</span>
          </div>
          <div className="col-md-4">
            {this.state.currentPage ? <PageLiker like={this.like} dislike={this.dislike} isLiked={this.state.currentPage.isLiked}/> : ''}
          </div>
        </div>
        <div className="row">
          <nav className="col-md-12">
            <ul className="pagination">
              <li onClick={this.previousPage}>
                {prevEnabled ? <a href="#" aria-label="Previous"><span aria-hidden="true">Previous</span></a> : ''}
              </li>
              <li onClick={this.nextPage}>
                {nextEnabled ? <a href="#" aria-label="Next"><span aria-hidden="true">Next</span></a> : ''}
              </li>
            </ul>
          </nav>
        </div>
        {this.state.currentPage ? <PageReview page={this.state.currentPage}/> : ''}
      </div>
    );
  }
});

module.exports = LikeMeNot;
