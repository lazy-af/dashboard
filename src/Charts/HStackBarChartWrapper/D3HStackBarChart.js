import * as d3 from 'd3';

const margin = {top: 20, right: 20, bottom: 30, left: 40};
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

export default class D3HStackBarChart {
    constructor(element) {
        console.log(element);
        const vis = this;

        const svg = d3.select(element)
            .append('svg')
                .attr('width', 700 + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)

        vis.g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        // y axis scale
        vis.y = d3.scaleBand()		
        .rangeRound([0, height])	
        .paddingInner(0.05)
        .align(0.1);

        // x axis scale
        vis.x = d3.scaleLinear()		
        .rangeRound([0, width]);

        vis.z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        vis.yAxisGroup = vis.g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)") 

        vis.xAxisGroup = vis.g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,"+height+")")

        vis.xAxisText = vis.xAxisGroup
        .append("text")
        .attr("y", 2)				
        .attr("x", vis.x(vis.x.ticks().pop()) + 0.5) 			
        .attr("dy", "0.32em")						
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .text("X -Axis Label")
        .attr("transform", "translate("+ (-width) +",-10)"); 


        // legend
        const legend = vis.g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
        .selectAll("g")
        .data(["lorem", "ipsum", "dolor", "consectetur", "adipisicing", "elit", "eiusmod"].reverse())
        .enter().append("g")
        //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
        .attr("transform", function(d, i) { return "translate(70," + (300 + i * 20) + ")"; });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", vis.z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d =>  d);


    }

    update = (data) => {
        const vis = this;

        const keys = data.columns.slice(1);
            console.log(keys);

            data.forEach(function(d) {
                d.total = d3.sum(keys, k => +d[k])
                return d
            })

            // data.sort(function(a, b) { return b.total - a.total; });
            vis.y.domain(data.map(d=> d.State));
            vis.x.domain([0, d3.max(data, d => d.total)]).nice();	
            vis.z.domain(keys);

            vis.g.exit().transition().duration(1000)
            .attr('width', 0)
            .attr('x', 0)
            .remove()

            // vis.g.transition().duration(1000)
            // .attr("x", d => vis.x(d[0]))
            // .attr("y", d => vis.y(d.data.State))
            // .attr("width", d => vis.x(d[1]) - vis.x(d[0]))
            // .attr("height", vis.y.bandwidth())


            vis.g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", d => vis.z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("y", d => vis.y(d.data.State))	 
            .attr('x', 0)
            .attr("height", vis.y.bandwidth())
            .transition().duration(1000)   
            .attr("x", d => vis.x(d[0]))			
            .attr("width", d => vis.x(d[1]) - vis.x(d[0]))	
            	
            
            


            // appending y axis
            vis.yAxisGroup					
                .call(d3.axisLeft(vis.y));			

            // appending x axis
            vis.xAxisGroup	
                .call(d3.axisBottom(vis.x).ticks(null, "s"))
                


                




    }
}