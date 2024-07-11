import axios from "axios";
const countriesDataUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`
const API_KEY = import.meta.env.VITE_API_KEY

const getCountriesData = () => {
    return axios.get(countriesDataUrl).then(res => res.data)
}
const getWeatherData = (selectedCountry) => {
    return axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCountry}&aqi=no`).then(res => res.data)
}

export default {getCountriesData,getWeatherData}