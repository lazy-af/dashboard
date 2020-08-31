import React, { useRef, useState, useEffect } from 'react'
import D3BarChart from './D3BarChart';

const data1 = [
    {
      value: 50,
      name: 'lorem'
    },
    {
      value: 94,
      name: 'ipsum'
    },
    {
      value: 63,
      name: 'doret'
    },
    {
      value: 88,
      name: 'sit al'
    },
    {
      value: 39,
      name: 'cradles'
    }
  ];

  const data2 = [
    {
      value: 99,
      name: 'consectetur'
    },
    {
      value: 44,
      name: 'natus'
    },
    {
      value: 78,
      name: 'adipisci'
    },
    {
      value: 16,
      name: 'Jane Bunford'
    },
    {
      value: 69,
      name: 'dolorem'
    }
  ];

const BarChartWrapper = (props) => {
    const chartArea = useRef();
    const [chart, setChart] = useState(null);

    //just the button functionality
    const [data, setData] = useState(data1);
    const clickHandler = () => {
        if (data === data1) {
            setData(data2)
        } else {
            setData(data1)
        }
    }
    // -----------------------------------

    useEffect(() => {
        if (!chart) {
            setChart(new D3BarChart(chartArea.current, props.width, props.height))
        } else {
            chart.update(data)
        }
    }, [chart, data, props.height, props.width])
    return (
        <div ref={chartArea}>
            {/* temporary button */}
            <button onClick={clickHandler}>click</button>
        </div>
    )
}

export default BarChartWrapper
