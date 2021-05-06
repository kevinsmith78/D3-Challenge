// @TODO: YOUR CODE HERE!
// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data from an external CSV file 
d3.csv("assets/data/data.csv").then(function(Data) {
    //console.log(Data);
    //console.log([Data]);
//Step 1. Parse Data/Cast as members
    weightData.forEach(function(Data) {
        Data.life = +Data.age;
        Data.size = + Data.obesity;
    });

//Step.2 Create Scale Functions
