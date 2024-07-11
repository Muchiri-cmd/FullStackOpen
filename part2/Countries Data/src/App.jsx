import { useState,useEffect } from "react"
import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY

const Input = ({handleSearch}) => {
  return (
    <>
      <label>Search Country By Name:
        <input type="search" placeholder="Kenya..." onChange={handleSearch}></input>
      </label>
    </>
  )
}
const Output = ({countries,searchVal,handleCountryView,countryWeather}) => {
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchVal.toLowerCase())
  )
  if (searchVal){
    if (filteredCountries.length === 1){
      const country = filteredCountries[0];
      return(
        <>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages && Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <div style={{fontSize: '150px'}}>
           {country.flag}
        </div>
       
        {countryWeather.current 
          ?  
          <>
            <h2>Weather in {country.name.common}</h2>
            <p>Temperature - {countryWeather.current.temp_c} Celcius</p>
              <div style={{fontSize: '90px'}}>
                  <img
                    src={countryWeather.current.condition.icon}
                    alt="weather icon"
                  />
              </div>
            <p>wind {countryWeather.current.wind_mph} mph</p>
          </>
          :
          <>
          
          </>

        }       
      </>
      )
    }
    else if (filteredCountries.length > 1 && filteredCountries.length < 10 ){
      return(
        <>
          {filteredCountries.map(country => (
            <div key={country.cca3}>
              <div key={country.cca3}>{country.name.common}
                  <button onClick={()=>handleCountryView(country.name.common)}>show</button>
              </div>
            </div>
          ))}
        </>
      )
    }else {
      return(
        <p>Too many matches,specify another filter</p>
      )
    } 
  }
 
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryWeather,setCountryWeather] = useState({})
  const [searchVal,setSearchVal] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(()=>{
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(res=> setCountries(res.data))
        .catch(err => console.log(err))
  },[searchVal])

  useEffect(()=>{
    if (selectedCountry){
      axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCountry}&aqi=no`)
      .then(res => setCountryWeather(res.data))
      .catch(err => console.log(err))
    }
    },[selectedCountry])

  const handleSearch = (event) => {
    setSearchVal(event.target.value)
    setSelectedCountry('')
  }

  const handleCountryView = (name) => {
      setSelectedCountry(name)
      setSearchVal(name)
  }

  return(
    <>
     <Input handleSearch={handleSearch}/>
     <Output countries={countries} searchVal={searchVal} handleCountryView={handleCountryView} countryWeather={countryWeather}/>
    </>
  )

}

export default App
