/** @jsx React.DOM */

var React = require("react");
var LikeMeNot = require("./components/like-me-not.jsx");
window.jQuery = require("jquery");
require("bootstrap");

React.render(<LikeMeNot/>, document.body);
