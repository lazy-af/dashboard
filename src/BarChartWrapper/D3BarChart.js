import * as d3 from 'd3';
import { scaleLinear, scaleBand, axisBottom, axisLeft } from 'd3';

const url = 'https://udemy-react-d3.firebaseio.com/tallest_men.json';
const margin = {top: 10, bottom: 40, left: 70, right: 10};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

 export default class D3Chart {
     constructor(element) {
        console.log(element);
        const svg = d3.select(element)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

        d3.json(url).then(response => {

            const y = scaleLinear()
                .domain([d3.min(response, d => d.height * .9), d3.max(response, d => d.height)])
                .range([height, 0])

            const x = scaleBand()
                .domain(response.map(d => d.name))
                .range([0, width])
                .padding(.4)

            const xAxisCall = axisBottom(x)
                svg.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(xAxisCall)

            const yAxisCall = axisLeft(y)
                svg.append('g')
                    .call(yAxisCall)
            
            const rects = svg.selectAll('rect')
                .data(response)

            rects.enter().append('rect')
                .attr('x', d => x(d.name))
                .attr('y', d => y(d.height))
                .attr('width', x.bandwidth)
                .attr('height', d => height - y(d.height) )
                .attr('fill', 'grey')
        })
     }

     update = () => {

     }
 }