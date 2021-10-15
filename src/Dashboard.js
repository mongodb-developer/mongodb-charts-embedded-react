import './Dashboard.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Chart from "./Chart";

const Dashboard = () => {
  const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/metadata';
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filterCountry, setFilterCountry] = useState({});

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    axios.get(url).then(res => {
      setCountries(res.data.countries);
      const randomCountryNumber = getRandomInt(res.data.countries.length);
      let randomCountry = res.data.countries[randomCountryNumber];
      setSelectedCountry(randomCountry);
      setFilterCountry({"country": randomCountry});
    })
  }, [])

  useEffect(() => {
    if (selectedCountry !== "") {
      setFilterCountry({"country": selectedCountry});
    }
  }, [selectedCountry])

  return <div className="App">
    <h1 className="title">MongoDB Charts</h1>
    <h2 className="title">COVID-19 Dashboard with Filters</h2>
    <div className="form">
      {countries.map(c => <div className="elem" key={c}>
        <input type="radio" name="country" value={c} onChange={() => setSelectedCountry(c)} checked={c === selectedCountry}/>
        <label htmlFor={c} title={c}>{c}</label>
      </div>)}
    </div>
    <div className="charts">
      <Chart height={'600px'} width={'800px'} filter={filterCountry} chartId={'6e3cc5ef-2be2-421a-b913-512c80f492b3'}/>
      <Chart height={'600px'} width={'800px'} filter={filterCountry} chartId={'be3faa53-220c-438f-aed8-3708203b0a67'}/>
      <Chart height={'600px'} width={'800px'} filter={filterCountry} chartId={'7ebbba33-a92a-46a5-9e80-ba7e8f3b13de'}/>
      <Chart height={'600px'} width={'800px'} filter={filterCountry} chartId={'64f3435e-3b83-4478-8bbc-02a695c1a8e2'}/>
    </div>
  </div>
};

export default Dashboard;
