import React, { useState, useEffect } from 'react';

// import axios
import axios from "axios";
// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs';

import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';
import "./App.css"

// api key
const APIkey = 'bcf2048bc3be154bded8f277f580ba2e';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Tetouan');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    // if input value is not empty
    if (inputValue !== '') {
      // set location
      setLocation(inputValue);
    }

    // select input
    const input = document.querySelector('input');

    // if input value is empty
    if (input.value === '') {
      // set animate to true
      setAnimate(true);
      // after 500 ms set animate to false
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    // clear input
    input.value = '';

    // prevent defaults
    e.preventDefault();
  };

  // fetch the data
  useEffect(() => {
    // set loading to true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
        // set the data after 1500 ms
        setTimeout(() => {
          setData(res.data);
          // set loading to false
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  // error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 2000);
    // clear timer
    return () => clearTimeout(timer);
  }, [errorMsg]);

  // if data is false show the loader
  if (!data) {
    return (
      <div >
        <div>
          <ImSpinner8  />
        </div>
      </div>
    );
  }

  // set the icon according to the weather
  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy  />;
      break;
    case 'Clear':
      icon = <IoMdSunny  />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill  />;
      break;
    case 'Snow':
      icon = <IoMdSnow  />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }

  // date object
  const date = new Date();

  return (
    <div >

      
      {errorMsg && (
        <div >{`${errorMsg.response.data.message}`}</div>
      )}
      {/* form */}
      
      <form>
        <div >
          <input onChange={(e) => handleInput(e)} type='text' placeholder='Search by city or country'/>
          <button onClick={(e) => handleSubmit(e)}>
            <IoMdSearch  />
          </button>
        </div>
      </form>
        <p>the.weather</p>
        <h4>weather Details</h4>
      {/* card */}
      <div >
        {loading ? (
          <div >
            <ImSpinner8  />
          </div>
        ) : (
          <div >
             {/* card body */}
            <div class="b">
              <div class="c">
                {/* temp */}
                <div >
                  {parseInt(data.main.temp)}
                </div>
                
                
                  {/* celsius icon */}
                  <div >
                        <TbTemperatureCelsius />
                  </div>
              </div>
                  {/* card top */}
              <div >
              
              
              <div>
                {/* country name */}
                <div >
                  {data.name}, {data.sys.country}
                </div> 
                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* icon */}
           <div class="d">
            <div >{icon}</div>
              {/* weather description */}
              <div >
                {data.weather[0].description}
              </div>
           </div>
            </div>
            {/* card bottom */}
            <div  class="icon1">
              <div >
                <div class="icon" >
                  {/* icon */}
                  <div >
                    <BsEye />
                  </div>
                  <div class="icon">
                    Visibility{' '}
                    <span >{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div  class="icon">
                  {/* icon */}
                  <div >
                    <BsThermometer />
                  </div>
                  <div class="icon" >
                    Feels like
                    <div >
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div  >
                <div  class="icon">
                  {/* icon */}
                  <div >
                    <BsWater />
                  </div>
                  <div class="icon">
                    Humidity
                    <span >{data.main.humidity} %</span>
                  </div>
                </div>
                <div  class="icon">
                  {/* icon */}
                  <div >
                    <BsWind />
                  </div>
                  <div class="icon">
                    Wind <span >{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
