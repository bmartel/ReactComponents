  /** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */
'use strict';

var app = require('./app.jsx');
var FilterBox = require('./filter-box.jsx');

React.renderComponent(
  /* jshint ignore:start */
  <FilterBox url="search-data.json"/>,
  document.getElementById('components')
  /* jshint ignore:end */
);

// React.renderComponent(
//   /* jshint ignore:start */
//   <FilterBox queryParamKey="title" url="http://en.wikipedia.org/w/api.php?format=json&action=query&titles=[[title]]&prop=revisions&rvprop=content"/>,
//   document.getElementById('components')
//   /* jshint ignore:end */
// );
