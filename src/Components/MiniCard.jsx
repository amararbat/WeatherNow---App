import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (iconString) {
      const iconMapping = {
        cloud: cloud,
        rain: rain,
        clear: sun,
        thunder: storm,
        fog: fog,
        snow: snow,
        wind: wind,
      };
      setIcon(iconMapping[iconString.toLowerCase()] || sun);
    }
  }, [iconString]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const dateOptions = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-IN', dateOptions);
  };

  const date = formatDate(time);

  return (
    <div className='glassCard w-[10rem] h-[10rem] p-2 flex flex-col items-center'>
      <p className='text-center font-bold text-sm truncate'>{date}</p>
      <hr className='my-2 w-full' />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="forecast not available" className='w-[4rem] h-[4rem]' />
      </div>
      <p className='text-center font-bold text-lg'>{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
