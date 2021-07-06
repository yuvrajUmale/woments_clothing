var margin = {
    top: 30,
    right: 20,
    bottom: 180,
    left: 60,
};
var width = 800 - margin.left - margin.right;
var height = 570 - margin.top - margin.bottom;

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
var all = [
    {
        name: "Home Value",
        code: "HOME_VALUE",
        children: [
            {
                name: "Dresses",
                code: "Q084002",
                count: 6334,
            },
            {
                name: "Knits",
                code: "Q084003",
                count: 4844,
            },
            {
                name: "Blouses",
                code: "Q084004",
                count: 3096,
            },
            {
                name: "Sweaters",
                code: "Q084005",
                count: 1428,
            },
            {
                name: "Pants",
                code: "Q084006",
                count: 1388,
            },
        ],
    },
];
var data = all[0].children;

// Set the scale domain.

var x = d3
    .scaleBand()
    .rangeRound([0, width])
    .domain(
        data.map(function (d) {
            return d.name;
        })
    )
    .padding(0.2);

var y = d3
    .scaleLinear()
    .domain([
        0,
        d3.max(data, function (d) {
            return d.count;
        }),
    ])
    .range([height, 0]);

// Add the bins.
svg.selectAll(null)
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", "steelblue")
    .attr("x", function (d) {
        return x(d.name);
    })
    .attr("width", function (d) {
        return x.bandwidth();
    })
    .attr("y", function (d) {
        return y(d.count);
    })
    .attr("height", function (d) {
        return height - y(d.count);
    });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-12,50) rotate(-90)");

svg.append("g").attr("class", "y axis").call(d3.axisLeft(y));
