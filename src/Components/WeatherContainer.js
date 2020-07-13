import  React, { useState } from 'react';
import '../Styles/Weather.css';
import  WeatherInfo from './WeatherInfo';

function WeatherContainer(){
    const API_KEY ='c87dda8f9f5832a03224b0d2545906fc';
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState({
        temp: null,
        humidity: null,
        desc: null,
        city: null
    });
    const [isValidZipCode, setIsValidZipCode] = useState(true);





   function updateSearchQuery(event){
       let zipCode = event.target.value;
       let isValid= validateZipCode(zipCode);
       setSearchQuery(zipCode);
       if(isValid || zipCode === '' || isValid.length === 6){
          
          setIsValidZipCode(true);
       }else{
          setIsValidZipCode(false);
       }
    }

   function validateZipCode(zipCode){
       let regex= /[0-9]{6}/;
       return regex.test(zipCode);
   }
   
   function getWeatherData(){
    if(!isValidZipCode || searchQuery === ''){
        setIsValidZipCode(false);
        return;
    }
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},in&appid=c87dda8f9f5832a03224b0d2545906fc`)
      .then(response => response.json())
      .then(data => setWeatherData({
         temp:  convertToFarenheit(data.main.temp),
         humidity: data.main.humidity,
         desc: data.weather[0].main,
         city: data.name
      }));
   }

   function convertToFarenheit(temp){
       return ((temp - 273.15) * (9.0 / 5.0) +32).toFixed(0);
   }





    return(
        <section className="weather-container">
          <header className="weather-header">
              <h3>Weather</h3>
              <div>
               <input
                placeholder="Zip Code"
                className="search-input"
                onChange={updateSearchQuery}
                maxLength='7'
                />
                 <button onClick={getWeatherData} className="material-icons">search  
                </button>
            </div>
          </header>
          <p className="error">{isValidZipCode ? '' : 'Invalid Zip Code'}</p>
          <section className="weather-info">
            {weatherData.temp === null ? (
                <p>No Weather to Display<i className="material-icons">wb_sunny</i>
                </p>
            )  : <WeatherInfo data={weatherData}/>
        
        }
          </section>
        </section>
    )
}

export default WeatherContainer;