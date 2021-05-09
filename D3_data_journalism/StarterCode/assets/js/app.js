// @TODO: YOUR CODE HERE!
// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
//Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data from an external CSV file 
d3.csv("assets/data/data.csv").then(function(weightData) {
  //console.log(Data);
  //console.log([Data]);

  //Step 1. Parse Data/Cast as members (age/obesity)
  weightData.forEach(function(data) {
    data.age = +data.age;
    data.obesity = +data.obesity;
  });

  //Step.2 Create Scale Functions
  var xLinearScale = d3.scaleLinear()
    .domain([10, d3.max(weightData, d => d.age)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(weightData, d => d.obesity)])
    .range([height, 0]);

  // Step 3: Create axis functions

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(weightData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("class", "stateText")
    .attr("class", "stateCircle")
  
  var textgroup = chartGroup.selectAll("text.abbrtext")
    .data(weightData)
    .enter()
    .append("text")
    .attr("class", "abbrtext")
    .attr("cx", d => xLinearScale(d["age"]))
    .attr("cy", d => yLinearScale(d["obesity"]))
    .attr("text-anchor", "middle")
    .attr("font-size", "8px")
    .attr("font-width", "bold")
    .attr("fill", "green")
    .text(d => d.abbr)


  // Step 6: Initialize tool tip   
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>Age: ${d.age}<br>Weight: ${d.obesity}`);
    });

  // Step 7: Create tooltip in the chart
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  circlesGroup.on("click", function (data) {
    toolTip.show(data, this);
  })

    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Number of Billboard 100 Hits");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Hair Metal Band Hair Length (inches)");
}).catch(function (error) {
  //console.log(error);
});
