import * as d3 from 'd3';




export default class D3LineChart {
    constructor(element, width, height) {
        const vis = this;
        console.log(element);
        const margin = {top: 20, right: 20, bottom: 30, left: 50};
        vis.width = width - margin.left - margin.right;
        vis.height = height - margin.top - margin.bottom;

        vis.svg = d3.select(element).append("svg")
            .attr("width", vis.width + margin.left + margin.right)
            .attr("height", vis.height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", "translate(0," + vis.height + ")")

        vis.yAxisGroup = vis.svg.append("g")

    }

    update = (data) => {
        const vis = this;

        const parseTime = d3.timeParse("%d-%b-%y");
        data.forEach(d => {
            d.date = parseTime(d.date);
            d.close = +d.close;
        }); 
        // console.log(data);

        // scale
        const x = d3.scaleTime()
            .range([0, vis.width])
            .domain(d3.extent(data, d => d.date ));

        const y = d3.scaleLinear()
            .range([vis.height, 0])
            .domain([0, d3.max(data, d => d.close)]);

        // axis
        const yAxis = d3.axisLeft(y)
            // .tickSizeInner(-vis.width)

        const xAxis = d3.axisBottom(x)

        // axis call
        vis.xAxisGroup
            .transition().duration(1000)
            .call(xAxis);

        vis.yAxisGroup
            .transition().duration(1000)
            .call(yAxis);

        // defining line
        const valueline = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));


        // data join
        const line = vis.svg.selectAll('.line')
            .data([data])

        line.exit().transition().duration(1000)
            .remove()

        // enter
        line.enter().append("path")
            .merge(line)
            .attr("d", valueline)
            .attr("class", "line") 
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-dasharray", function(d){ return this.getTotalLength() })
            .attr("stroke-dashoffset", function(d){ return -this.getTotalLength() })


        // update
        vis.svg.selectAll(".line")
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("d", valueline)
            .attr("stroke-dashoffset", 0)
        
        
    }
}




