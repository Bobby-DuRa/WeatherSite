import React,{useState,useEffect} from 'react'
import './weather.css'
import Weathercard  from './Weathercard'

const Weather = () => {

  const [searchValue, setSearchValue] = useState("kathmandu")
  const [weatherInfo,setWeatherInfo] = useState("{}")
  
  const getWeatherInfo = async() => {
      try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8bfa174e261bc0ce737a6d9502794f7a`
       let res = await fetch(url)
       let data = await res.json();   // data may find or not so we use await / fetch returns promise
       
       const {temp,humidity,pressure }= data.main;
       const{main: weathermood} = data.weather[0];
       const {name} = data;
       const {speed} = data.wind;
       const {country,sunset} = data.sys;

       const myNewWeatherInfo = {
           temp,humidity,pressure,weathermood,name,speed,country,sunset,
       }
       setWeatherInfo(myNewWeatherInfo);
    }
      catch(error)
      {
          console.log(error)
      }

   }

  useEffect(() => {
      getWeatherInfo();               //When we refresh page for the first time, getweatherInfo will run.
  }, []);

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="Search" autoFocus id="Search" className="searchTerm"
                        value ={searchValue }
                        onChange ={(event)=>setSearchValue(event.target.value)}
                    />
                    <button className="searchButton" type="button"
                        onClick={getWeatherInfo}
                    > Search </button>
                </div>
            </div>
      <Weathercard weatherInfo ={weatherInfo} />


        </>
    )
}

export default Weather
