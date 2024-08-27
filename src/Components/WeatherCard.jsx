import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';
import '../index.css';
import { useDate } from '../Utils/useDate';

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();

  useEffect(() => {
    const iconMapping = {
      cloud: cloud,
      rain: rain,
      clear: sun,
      thunder: storm,
      fog: fog,
      snow: snow,
      wind: wind,
    };
    setIcon(iconMapping[iconString?.toLowerCase()] || sun);
  }, [iconString]);

  const formatDate = () => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date().toLocaleDateString('en-IN', options);
  };

  return (
    <div className='w-full max-w-sm h-auto glassCard p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
      <div className='text-center text-4xl font-extrabold mb-2'>
        {place}
      </div>
      <div className='flex flex-col items-center mb-4'>
        <img src={icon} alt="weather icon" className='w-20 h-20 mb-2' />
        <p className='font-semibold text-5xl mb-2'>{temperature} &deg;C</p>
        <div className='flex justify-center items-center w-full mb-4'>
          <p className='text-lg font-bold mx-2'>{formatDate()}</p>
          <p className='text-lg mx-2'>{time}</p>
        </div>
      </div>
      <div className='flex justify-center items-center gap-4 mb-6'>
        <div className='text-center w-1/2 p-4 font-bold bg-blue-700 rounded-lg shadow-lg'>
          Wind Speed
          <p className='font-normal text-lg'>{windspeed} km/h</p>
        </div>
        <div className='text-center w-1/2 p-4 font-bold bg-green-700 rounded-lg shadow-lg'>
          Humidity
          <p className='font-normal text-lg'>{humidity} gm/m&#179;</p>
        </div>
      </div>
      <div className='flex justify-between items-center p-3 border-t border-gray-300'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <div className='mt-4 text-center text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  );
};

export default WeatherCard;
