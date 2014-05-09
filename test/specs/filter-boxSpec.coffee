###* @jsx React.DOM ###

filter-box = require('../../app/jsx/filter-box.jsx')

module.exports = () ->
  ReactTestUtils = Render = Simulate = null
  
  beforeEach () ->
    ReactTestUtils = React.addons.TestUtils
    Render = ReactTestUtils.renderIntoDocument
    Simulate = ReactTestUtils.Simulate

  it "Check Text Assignment", () ->
    filter-box = `<filter-box />`
    Render filter-box
    
    expect(filter-box).to.exist
    expect(filter-box.getDOMNode().innerHTML).to.equal 'Hello World'


