import React, { useRef, useState, useEffect } from "react";
import D3SunBurstChart from "./D3SunBurstChart";
import * as d3 from "d3";
import ObjectsToCsv from "objects-to-csv";
import Axios from "axios";

const dta = [
  { code: "CA", name: "California" },
  { code: "TX", name: "Texas" },
  { code: "NY", name: "New York" },
];

// Function that takes csv data as an input an convert it into a json data
const buildHierarchy = (csv) => {
  var root = { name: "root", children: [] };
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) {
      // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        var foundChild = false;
        for (var k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = { name: nodeName, children: [] };
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = { name: nodeName, size: size };
        children.push(childNode);
      }
    }
  }
  return root;
};

const SunBurstChartWrapper = (props) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  let url = "https://dashboard-8836f.firebaseio.com/data.json";
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(url)
      .then((data) => {
        console.log(data.data);

        return data.data.map((d) => {
          return {
            path: `${d.lineOfBusiness}-${d.phase}-${d.solutionTechnologiesUsed}-${d.capabilities}`,
            ratio: Math.floor(Math.random() * 9 + 1),
          };
        });
      })
      .then((finalData) => {
        (async () => {
          const csv = new ObjectsToCsv(finalData);

          // Return the CSV file as string:
          console.log(await csv.toString());
        })();
      });

    d3.text("sunactualdata.csv").then((text) => {
      var csv = d3.csvParseRows(text);
      var json = buildHierarchy(csv);
      console.log(json);
      setData(json);
    });
  }, [url]);

  useEffect(() => {
    if (!chart) {
      setChart(
        new D3SunBurstChart(chartArea.current, props.width, props.height)
      );
    } else {
      chart.update(data);
    }
  }, [chart, data, props.height, props.width]);
  return (
    <div id="main">
      <div id="sequence"></div>
      <div ref={chartArea} id="chart">
        <div id="explanation" style={{ visibility: "hidden" }}>
          <span id="percentage"></span>
          <br />
          of visits begin with this sequence of pages
        </div>
      </div>
    </div>
  );
};

export default SunBurstChartWrapper;
