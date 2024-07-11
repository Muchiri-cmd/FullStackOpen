import { useState,useEffect } from "react"
import Input from "./components/input"
import Output from "./components/output"
import CountryServices from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [countryWeather,setCountryWeather] = useState({})
  const [searchVal,setSearchVal] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(()=>{
    CountryServices
      .getCountriesData()
      .then(countries => setCountries(countries))
      .catch(err=> console.log('Error fetching countries:',err))
  },[searchVal])

  useEffect(()=>{
    if (selectedCountry){
      CountryServices
        .getWeatherData(selectedCountry)
        .then(weather=>setCountryWeather(weather))
        .catch(err => console.log("Error fetching weather data: ",err))
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
