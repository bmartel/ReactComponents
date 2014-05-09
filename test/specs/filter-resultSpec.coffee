###* @jsx React.DOM ###

filter-result = require('../../app/jsx/filter-result.jsx')

module.exports = () ->
  ReactTestUtils = Render = Simulate = null
  
  beforeEach () ->
    ReactTestUtils = React.addons.TestUtils
    Render = ReactTestUtils.renderIntoDocument
    Simulate = ReactTestUtils.Simulate

  it "Check Text Assignment", () ->
    filter-result = `<filter-result />`
    Render filter-result
    
    expect(filter-result).to.exist
    expect(filter-result.getDOMNode().innerHTML).to.equal 'Hello World'


