(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

'use strict';
module.exports = React.createClass({displayName: 'exports',
  getInitialState: function () {
    return {
      message : 'Always a pleasure scaffolding your apps.'
    };
  },
  reverse: function (event) {
	this.setState({
      message : this.state.message.split('').reverse().join('')
    });
  },
  render: function () {
	return (
      /* jshint ignore:start */
      React.DOM.div(null, 
        React.DOM.p( {ref:"p", className:"lead"}, this.state.message),
        React.DOM.p(null, 
          React.DOM.button(
            {type:"button",
            className:"btn btn-success",
            ref:"button",
            onClick:this.reverse}, 
            React.DOM.span( {className:"glyphicon glyphicon-refresh"}),
              "Click me!"
          )
        )
      )
      /* jshint ignore:end */
	);
  }
});


},{}],2:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

'use strict';
var FilterResultList = require('./filter-result-list.jsx');

module.exports = React.createClass({displayName: 'exports',
  //
  // ### propTypes
  //
  // React.PropTypes exports a range of validators that can be used to make sure the data you receive is valid.
  // for more information [React reusable components](http://facebook.github.io/react/docs/reusable-components.html)
  //
  propTypes : {
  },
  
  //
  // ### mixins
  //
  // The mixins array allows you to use mixins to share behavior among multiple components.
  //
  mixins : [],
  
  //
  // ### statics
  //
  // The statics object allows you to define static methods that can be called on the component class.
  // Methods defined within this block are static, meaning that you can run them before any component 
  // instances are created, and the methods do not have access to the props or state of your components.
  //
  statics : [],
  
  //
  // ### getDefaultProps
  //
  // Invoked once when the component is mounted. 
  // Values in the mapping will be set on this.props if that prop is not specified by the parent component 
  //
  getDefaultProps: function () {
    return {
      url: '',
      dataKey: 'data',
      dataType: 'json',
      queryParamKey: 'title',
      queryAppend: ''
    };
  },
  
  //
  // ### getInitialState
  //
  // Invoked once before the component is mounted. The return value will be used as the initial value of this.state.
  //
  getInitialState: function () {

    return {
      placeholder: 'Search something...',
      text: '',
      selectedIndex: 0,
      data: [],
      request: 'web'
    };
  },

  //
  // ### componentWillMount
  //
  // Invoked once, immediately before the initial rendering occurs. 
  // If you call setState within this method, render() will see the updated state 
  // and will be executed only once despite the state change.
  //
  componentWillMount: function () {
  
  },
  
  //
  // ### componentDidMount
  //
  // Invoked immediately after rendering occurs. 
  // At this point in the lifecycle, the component has a DOM representation which you can access via this.getDOMNode().
  // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, 
  // or send AJAX requests, perform those operations in this method.
  //
  componentDidMount: function () {
    // Detect whether url points to a json file or an actual web api
    var matchJson = RegExp('^[\\w-_\.%\/]*.json$');
    if(matchJson.exec(this.props.url)) {
      this.setState({request: 'file'});
    }else {
      this.setState({request: 'web'});
    }
  },
  
  //
  // ### componentWillReceiveProps
  //
  // Invoked when a component is receiving new props. 
  // This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called 
  // by updating the state using this.setState().
  // The old props can be accessed via this.props. 
  // Calling this.setState() within this function will not trigger an additional render.
  //
  componentWillReceiveProps: function () {
  
  }, 
  
  //
  // ### shouldComponentUpdate(nextProps, nextState)
  //
  // Invoked before rendering when new props or state are being received. 
  // This method is not called for the initial render or when forceUpdate is used.
  // Use this as an opportunity to return false when you're certain that the transition 
  // to the new props and state will not require a component update.
  //
  shouldComponentUpdate: function (nextProps, nextState) {
    
    // necessary to return true for component to update on changes
    return true;
  }, 
 
   //
  // ### componentWillUpdate(object nextProps, object nextState)
  //
  // Invoked immediately before rendering when new props or state are being received. 
  // This method is not called for the initial render.
  // Use this as an opportunity to perform preparation before an update occurs.
  //
  componentWillUpdate: function (nextProps, nextState) {
  
  },
  
  //
  // ### componentDidUpdate(object prevProps, object prevState)
  //
  // Invoked immediately after updating occurs. 
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  //
  componentDidUpdate: function (prevProps, prevState) {
    

  },

  //
  // ### componentWillUnmount
  //
  // Invoked immediately before a component is unmounted from the DOM.
  // Perform any necessary cleanup in this method, such as invalidating timers or 
  // cleaning up any DOM elements that were created in componentDidMount
  //
  componentWillUnmount: function () {
  
  },
  clearResults: function(e) {
    this.setState({data: [], selectedIndex: 0});
  },
  search: function(e){

    var text = e.target.value;
    if(this.state.request == 'web') {
      this.searchWeb(text);
    }
    else if(this.state.request == 'file') {
      this.searchJson(text);
    }
  },
  searchWeb: function(text) {
    if(!text) {
      text = '';
    }
    var searchText = new RegExp('\[\['+ this.props.queryParamKey+'\]\]');
    var requestUrl = this.props.url.replace(searchText, encodeURIComponent(text));
    console.log(requestUrl);

    $.ajax({
      url: requestUrl,
      dataType: this.props.dataType,
      success: function(data) {
        var searchReturn = [];
        console.log(data);
        if(data && data[this.props.dataKey] && data[this.props.dataKey] instanceof array){
          searchReturn = data[this.props.dataKey];
        }

        this.setState({data: searchReturn});

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  },
  searchJson: function(text){

    var textMatch = new RegExp(text);

    $.ajax({
      url: this.props.url,
      dataType: this.props.dataType,
      success: function(data) {
        var searchReturn = [];

        data[this.props.dataKey].forEach(function(searchResult, index){

            if(searchResult && searchResult.name){
              if(text.length > 0 && textMatch.exec(searchResult.name)){ 
                searchReturn.push(searchResult); 
              }
            }

        });

        this.setState({data: searchReturn});

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });  
  },
  //
  // ### render
  // (* required)
  //
  // When called, it should examine this.props and this.state and return a single child component. 
  // This child component can be either a virtual representation of a native DOM component 
  // or another composite component that you've defined yourself.
  //
  render: function () {
    return (
     /*jshint ignore:start */
      React.DOM.div( {className:"filter-search"}, 
        React.DOM.input( {className:"filter-box", placeholder:this.state.placeholder, onKeyUp:this.search, onBlur:this.clearResults, onFocus:this.search}),
        FilterResultList( {data:this.state.data})
      )
     /*jshint ignore:end */
    );
  }
});


},{"./filter-result-list.jsx":3}],3:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

'use strict';
var FilterResult = require('./filter-result.jsx');

module.exports = React.createClass({displayName: 'exports',
  //
  // ### propTypes
  //
  // React.PropTypes exports a range of validators that can be used to make sure the data you receive is valid.
  // for more information [React reusable components](http://facebook.github.io/react/docs/reusable-components.html)
  //
  propTypes : {
  },
  
  //
  // ### mixins
  //
  // The mixins array allows you to use mixins to share behavior among multiple components.
  //
  mixins : [],
  
  //
  // ### statics
  //
  // The statics object allows you to define static methods that can be called on the component class.
  // Methods defined within this block are static, meaning that you can run them before any component 
  // instances are created, and the methods do not have access to the props or state of your components.
  //
  statics : [],
  
  //
  // ### getDefaultProps
  //
  // Invoked once when the component is mounted. 
  // Values in the mapping will be set on this.props if that prop is not specified by the parent component 
  //
  getDefaultProps: function () {
    return {
      data: [],
      contentKey1: 'name',
      contentKey2: 'content'
    };
  },
  
  //
  // ### getInitialState
  //
  // Invoked once before the component is mounted. The return value will be used as the initial value of this.state.
  //
  getInitialState: function () {
    return {
    };
  },

  //
  // ### componentWillMount
  //
  // Invoked once, immediately before the initial rendering occurs. 
  // If you call setState within this method, render() will see the updated state 
  // and will be executed only once despite the state change.
  //
  componentWillMount: function () {
  
  },
  
  //
  // ### componentDidMount
  //
  // Invoked immediately after rendering occurs. 
  // At this point in the lifecycle, the component has a DOM representation which you can access via this.getDOMNode().
  // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, 
  // or send AJAX requests, perform those operations in this method.
  //
  componentDidMount: function () {
  
  },
  
  //
  // ### componentWillReceiveProps
  //
  // Invoked when a component is receiving new props. 
  // This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called 
  // by updating the state using this.setState().
  // The old props can be accessed via this.props. 
  // Calling this.setState() within this function will not trigger an additional render.
  //
  componentWillReceiveProps: function () {
  
  }, 
  
  //
  // ### shouldComponentUpdate(nextProps, nextState)
  //
  // Invoked before rendering when new props or state are being received. 
  // This method is not called for the initial render or when forceUpdate is used.
  // Use this as an opportunity to return false when you're certain that the transition 
  // to the new props and state will not require a component update.
  //
  shouldComponentUpdate: function (nextProps, nextState) {
    
    // necessary to return true for component to update on changes
    return true;
  }, 
 
   //
  // ### componentWillUpdate(object nextProps, object nextState)
  //
  // Invoked immediately before rendering when new props or state are being received. 
  // This method is not called for the initial render.
  // Use this as an opportunity to perform preparation before an update occurs.
  //
  componentWillUpdate: function (nextProps, nextState) {
  
  },
  
  //
  // ### componentDidUpdate(object prevProps, object prevState)
  //
  // Invoked immediately after updating occurs. 
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  //
  componentDidUpdate: function (prevProps, prevState) {
  
  },

  //
  // ### componentWillUnmount
  //
  // Invoked immediately before a component is unmounted from the DOM.
  // Perform any necessary cleanup in this method, such as invalidating timers or 
  // cleaning up any DOM elements that were created in componentDidMount
  //
  componentWillUnmount: function () {
  
  },
  
  //
  // ### render
  // (* required)
  //
  // When called, it should examine this.props and this.state and return a single child component. 
  // This child component can be either a virtual representation of a native DOM component 
  // or another composite component that you've defined yourself.
  //
  render: function () {
    var contentKey1 = this.props.contentKey1;
    var contentKey2 = this.props.contentKey2;

    if(this.props.data instanceof Array){
      var filterResultNodes = this.props.data.map(function(result, key){
        return FilterResult( {key:key, content1:result[contentKey1], content2:result[contentKey2]} )
      });
    }
    return (
     /*jshint ignore:start */
        React.DOM.div( {className:"filter-content"}, 
          filterResultNodes
        )
     /*jshint ignore:end */
    );
  }
});


},{"./filter-result.jsx":4}],4:[function(require,module,exports){
/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

'use strict';
module.exports = React.createClass({displayName: 'exports',
  //
  // ### propTypes
  //
  // React.PropTypes exports a range of validators that can be used to make sure the data you receive is valid.
  // for more information [React reusable components](http://facebook.github.io/react/docs/reusable-components.html)
  //
  propTypes : {
  },
  
  //
  // ### mixins
  //
  // The mixins array allows you to use mixins to share behavior among multiple components.
  //
  mixins : [],
  
  //
  // ### statics
  //
  // The statics object allows you to define static methods that can be called on the component class.
  // Methods defined within this block are static, meaning that you can run them before any component 
  // instances are created, and the methods do not have access to the props or state of your components.
  //
  statics : [],
  
  //
  // ### getDefaultProps
  //
  // Invoked once when the component is mounted. 
  // Values in the mapping will be set on this.props if that prop is not specified by the parent component 
  //
  getDefaultProps: function () {
    return {
      content1: '',
      content2: ''
    };
  },
  
  //
  // ### getInitialState
  //
  // Invoked once before the component is mounted. The return value will be used as the initial value of this.state.
  //
  getInitialState: function () {
    return {
      
    };
  },

  //
  // ### componentWillMount
  //
  // Invoked once, immediately before the initial rendering occurs. 
  // If you call setState within this method, render() will see the updated state 
  // and will be executed only once despite the state change.
  //
  componentWillMount: function () {
  
  },
  
  //
  // ### componentDidMount
  //
  // Invoked immediately after rendering occurs. 
  // At this point in the lifecycle, the component has a DOM representation which you can access via this.getDOMNode().
  // If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, 
  // or send AJAX requests, perform those operations in this method.
  //
  componentDidMount: function () {
  
  },
  
  //
  // ### componentWillReceiveProps
  //
  // Invoked when a component is receiving new props. 
  // This method is not called for the initial render.
  // Use this as an opportunity to react to a prop transition before render() is called 
  // by updating the state using this.setState().
  // The old props can be accessed via this.props. 
  // Calling this.setState() within this function will not trigger an additional render.
  //
  componentWillReceiveProps: function () {
  
  }, 
  
  //
  // ### shouldComponentUpdate(nextProps, nextState)
  //
  // Invoked before rendering when new props or state are being received. 
  // This method is not called for the initial render or when forceUpdate is used.
  // Use this as an opportunity to return false when you're certain that the transition 
  // to the new props and state will not require a component update.
  //
  shouldComponentUpdate: function (nextProps, nextState) {
    
    // necessary to return true for component to update on changes
    return true;
  }, 
 
   //
  // ### componentWillUpdate(object nextProps, object nextState)
  //
  // Invoked immediately before rendering when new props or state are being received. 
  // This method is not called for the initial render.
  // Use this as an opportunity to perform preparation before an update occurs.
  //
  componentWillUpdate: function (nextProps, nextState) {
  
  },
  
  //
  // ### componentDidUpdate(object prevProps, object prevState)
  //
  // Invoked immediately after updating occurs. 
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  //
  componentDidUpdate: function (prevProps, prevState) {
  
  },

  //
  // ### componentWillUnmount
  //
  // Invoked immediately before a component is unmounted from the DOM.
  // Perform any necessary cleanup in this method, such as invalidating timers or 
  // cleaning up any DOM elements that were created in componentDidMount
  //
  componentWillUnmount: function () {
  
  },
  
  //
  // ### render
  // (* required)
  //
  // When called, it should examine this.props and this.state and return a single child component. 
  // This child component can be either a virtual representation of a native DOM component 
  // or another composite component that you've defined yourself.
  //
  render: function () {
    return (
     /*jshint ignore:start */
        React.DOM.div( {className:"filter-row"}, 
          React.DOM.div( {className:"filter-row-image"}, 
            this.props.content1
          ),
          React.DOM.div( {className:"filter-row-content"}, 
            React.DOM.p(null, this.props.content2)
          )
        )
     /*jshint ignore:end */
    );
  }
});


},{}],5:[function(require,module,exports){
  /** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */
'use strict';

var app = require('./app.jsx');
var FilterBox = require('./filter-box.jsx');

React.renderComponent(
  /* jshint ignore:start */
  FilterBox( {url:"search-data.json"}),
  document.getElementById('components')
  /* jshint ignore:end */
);

// React.renderComponent(
//   /* jshint ignore:start */
//   <FilterBox queryParamKey="title" url="http://en.wikipedia.org/w/api.php?format=json&action=query&titles=[[title]]&prop=revisions&rvprop=content"/>,
//   document.getElementById('components')
//   /* jshint ignore:end */
// );

},{"./app.jsx":1,"./filter-box.jsx":2}]},{},[5])