import * as d3 from 'd3';

const margin = {top: 10, bottom: 10, left: 10, right: 10};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const radius = Math.min(width, height)/2;

export default class D3PieChart {
    constructor(element) {
        console.log(element)

    }
    update = () => {
        
    }

}