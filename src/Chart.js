import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = (props) => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-open-data-covid-19-zddgb'});
  const chartDiv = useRef(null);
  const [chart] = useState(sdk.createChart({
    chartId: props.chartId,
    height: props.height,
    width: props.width,
    theme: "dark"
  }));
  const [rendered, setRendered] = useState(false);
  const filter = props.filter;

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, []);

  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering", err));
    }
  }, [filter, rendered]);

  return <div className="chart" ref={chartDiv}/>;
};

export default Chart;
