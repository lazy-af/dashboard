import * as d3 from 'd3';
import { scaleLinear, scaleBand, axisBottom, axisLeft } from 'd3';

const margin = {top: 10, bottom: 40, left: 70, right: 10};
const width = 500 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

 export default class D3Chart {
     constructor(element) {
        const vis = this
        console.log(element);
        vis.svg = d3.select(element)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

        vis.xAxisGroup = vis.svg.append('g')
            .attr('transform', `translate(0, ${height})`)

        vis.yAxisGroup = vis.svg.append('g')
     }

     update = (data) => {
        const vis = this
        const y = scaleLinear()
            .domain([d3.min(data, d => d.value * .9), d3.max(data, d => d.value)])
            .range([height, 0])

        const x = scaleBand()
            .domain(data.map(d => d.name))
            .range([0, width])
            .padding(.4)

        const xAxisCall = axisBottom(x)
            vis.xAxisGroup
            .transition().duration(1000)
            .call(xAxisCall)

        const yAxisCall = axisLeft(y)
            vis.yAxisGroup
            .transition().duration(1000)
            .call(yAxisCall)

        // data join
        const rects = vis.svg.selectAll('rect')
            .data(data)

        // exit
        rects.exit().transition().duration(1000)
            .attr('height', 0)
            .attr('y', height)
            .remove()

        // update
        rects.transition().duration(1000)
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.value))
            .attr('width', x.bandwidth)
            .attr('height', d => height - y(d.value))

        // enter
        rects.enter().append('rect')
            .attr('x', d => x(d.name))
            .attr('y', d => height)
            .attr('width', x.bandwidth)
            .attr('fill', 'grey')
            .transition().duration(1000)
                .attr('height', d => height - y(d.value))
                .attr('y', d => y(d.value))

     }
 }