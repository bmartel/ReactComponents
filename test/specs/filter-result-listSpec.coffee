###* @jsx React.DOM ###

filter-result-list = require('../../app/jsx/filter-result-list.jsx')

module.exports = () ->
  ReactTestUtils = Render = Simulate = null
  
  beforeEach () ->
    ReactTestUtils = React.addons.TestUtils
    Render = ReactTestUtils.renderIntoDocument
    Simulate = ReactTestUtils.Simulate

  it "Check Text Assignment", () ->
    filter-result-list = `<filter-result-list />`
    Render filter-result-list
    
    expect(filter-result-list).to.exist
    expect(filter-result-list.getDOMNode().innerHTML).to.equal 'Hello World'


