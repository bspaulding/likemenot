var EventEmitter = require("event-emitter");
var _ = require("underscore");
var Firebase = require("firebase");

var CHANGE_EVENT = "PAGE_STORE_CHANGED";
var pages = [];

var pagesRef = new Firebase("https://likemenot.firebaseio.com/pages");
pagesRef.on("value", function(snapshot) {
  pages = snapshot.val();
  PageStore.emitChange();
}, function(error) {
  console.log("The read failed: " + error.code);
});

var ee = EventEmitter({});
var PageStore = _.extend(ee, {
  all: function() {
    return pages;
  },

  like: function(pageId) {
    var page = _.find(pages, function(page) { return page.id === pageId; });
    page.isLiked = true;
    PageStore.emitChange();

    pagesRef.child(pages.indexOf(page)).update({ isLiked: true });
  },
  dislike: function(pageId) {
    var page = _.find(pages, function(page) { return page.id === pageId; });
    page.isLiked = false;
    PageStore.emitChange();

    pagesRef.child(pages.indexOf(page)).update({ isLiked: false });
  },
  emitChange: function() {
    PageStore.emit(CHANGE_EVENT);
  },
  addChangeListener: function(fn) {
    PageStore.on(CHANGE_EVENT, fn);
  },
  removeChangeListener: function(fn) {
    PageStore.removeListener(CHANGE_EVENT, fn);
  }
});

module.exports = PageStore;
