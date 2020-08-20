import * as d3 from 'd3';

const width = 500;
const height = 300;
const radius = Math.min(width, height)/2;


export default class D3PieChart {
    constructor(element) {
        const vis = this;
        console.log(element);

        //svg container defined
        vis.svg = d3.select(element)
            .append('svg')
                .attr('width', width)
                .attr('height', height)
                    .append('g')
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        // pie defined
        vis.pie = d3.pie()
            .sort(null)
            .value((d) => d.value)

        // arc defined
        vis.arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4)

        vis.key = d => d.data.label;


        // appending the group with a class slices
        vis.svg.append("g")
            .attr("class", "slices");

    }
    update = (data) => {
        const vis = this;
        
        // setting scale ordinal
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])




        // data join for slices
        const slice = vis.svg.select(".slices").selectAll("path.slice")
            .data(vis.pie(data), vis.key);
    
        // appending path for each data in the array
        slice.enter()
            .insert("path")
            .style("fill", function(d) { return color(d.data.label); })
            .attr("class", "slice")
            .transition().duration(1000)
            .attrTween('d', function(d) {
                vis._current = vis._current || d;
                let i = d3.interpolate(vis._current, d);
                vis._current = i(0);
                return function(t) {
                    return vis.arc(i(t));
                };
            })
    
        // update
        slice		
            .transition().duration(1000)
            .attrTween("d", function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return vis.arc(interpolate(t));
                };
            })
    
        // exit
        slice.exit()
            .remove();
        
    }

}