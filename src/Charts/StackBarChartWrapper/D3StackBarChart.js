import * as d3 from 'd3';

const margin = {top: 20, right: 40, bottom: 30, left: 40};

export default class D3StackBarChart {
    constructor(element, widthPassed, heightPassed, colorScheme, legend, legendLength) {
        console.log(element);
        const vis = this;
        vis.legend = legend;
        vis.width = widthPassed - margin.left - margin.right;
        vis.height = heightPassed - margin.top - margin.bottom;

        if (legend) {
            vis.width = vis.width + legendLength;
        }

        vis.svg = d3.select(element)
            .append('svg')
                .attr('width', vis.width + margin.left + margin.right)
                .attr('height', vis.height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // set x scale
        vis.x = d3.scaleBand()
            .rangeRound([0, widthPassed])
            .padding(0.1)
            .align(0.1);

        // set y scale
        vis.y = d3.scaleLinear()
        .rangeRound([vis.height, 0]);

        // set the colors
        vis.z = d3.scaleOrdinal()
            .range(colorScheme);

        vis.xAxisGroup = vis.svg.append("g")
        .attr("transform", "translate(0," + vis.height + ")")

        vis.yAxisGroup = vis.svg.append("g")


        // legend
        if (vis.legend) {
                        // legend datajoin and enter
                    const legend = vis.svg.append("g")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", 10)
                        .attr("text-anchor", "end")
                            .selectAll("g")
                            .data(["lorem", "ipsum", "dolor", "consectetur", "adipisicing", "elit", "eiusmod"].reverse())
                            .enter().append("g")
                                .attr("transform", (d, i) => `translate(${0}, ${i * 20})`);
        
        
                    legend.append("rect")
                        .attr("x", vis.width - 19)
                        .attr("width", 19)
                        .attr("height", 19)
                        .attr("fill", vis.z);
        
                    legend.append("text")
                        .attr("x", vis.width - 24)
                        .attr("y", 9.5)
                        .attr("dy", "0.32em")
                        .text(function(d) { return d; });
                        }
        
    
    }

    update = (data) => {
        const vis = this;
        console.log("data received", data);
        vis.keys = data.columns.slice(1);
        console.log(vis.keys);

            data.forEach(function(d) {
                d.total = d3.sum(vis.keys, k => +d[k])
                return d
            })

            // console.log(data);
            
            // console.log(d3.stack().keys(vis.keys)(data));

            // data.sort((a, b) => b.total - a.total);
            vis.x.domain(data.map(d => d.State));
            vis.y.domain([0, d3.max(data, d => d.total)]).nice();
            vis.z.domain(vis.keys);


            //DATA JOIN
            const bars = vis.svg.append("g")
                .attr('class', 'bar')
                .selectAll("g")
                .data(d3.stack().keys(vis.keys)(data))


            bars.exit().transition().duration(1000)
                .remove()

            // Enter g and rect data join
            const rects = bars.enter().append("g")
                .merge(bars)
                .attr("fill", d => vis.z(d.key))
                    .selectAll("rect")
                    .data(d => d)

            rects.exit().remove();

            // rects
            // .transition().duration(1000)
            // .attr("x", d => vis.x(d.data.State))
            // .attr("width", vis.x.bandwidth())
            // .attr("height", d => (vis.y(d[0]) - vis.y(d[1])))

            // rect enter
            const enterBars = rects.enter().append("rect")
            rects.exit().transition().style('opacity', 0).remove()

            

            // update
            enterBars
            .merge(rects)
            .transition().duration(1000)
            .attr("x", d => vis.x(d.data.State))
            .attr("width", vis.x.bandwidth())
            .attr("y", d => vis.height)
            .transition().duration(1000)
            .attr("y", d => vis.y(d[1]))
            .attr("height", d => vis.y(d[0]) - vis.y(d[1]))

            enterBars.exit().remove()

            

            

            
            

            // x-axis print
            vis.xAxisGroup
                .attr("class", "axis")
                .transition().duration(1000)
                .call(d3.axisBottom(vis.x));

            // y-axis print
            vis.yAxisGroup
                .attr("class", "axis")
                .transition().duration(1000)
                .call(d3.axisLeft(vis.y).ticks(null, "s"))
                
            vis.yAxisGroup
                .append("text")
                    .attr("x", 2)
                    .attr("y", vis.y(vis.y.ticks().pop()) + 0.5)
                    .attr("dy", "0.32em")
                    .attr("fill", "#000")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "start")

                
    }

}