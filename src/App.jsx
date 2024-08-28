// App.jsx

import { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

function App() {
    const [input, setInput] = useState('');
    const { weather, thisLocation, values, place, setPlace, suggestions, fetchCitySuggestions } = useStateContext();

    // Submit city name and fetch weather data
    const submitCity = (city) => {
        setPlace(city || input); // Use selected suggestion or input value
        setInput('');
        setTimeout(() => {
            document.getElementById('cityInput').blur(); // Remove focus from input
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back to the top smoothly
        }, 100); // Delay for better user experience
    };

    return (
        <div className='w-full h-screen text-white px-8'>
            <nav className='w-full p-3 flex justify-between items-center'>
                <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
                <div className='relative'>
                    <div className='bg-white w-[20rem] overflow-hidden shadow-lg rounded flex items-center p-2 gap-2'>
                        <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
                        <input
                            id="cityInput"
                            type="text"
                            placeholder='Search city'
                            className='focus:outline-none w-full text-[#212121] text-lg px-2 rounded'
                            value={input}
                            onChange={e => {
                                setInput(e.target.value);
                                fetchCitySuggestions(e.target.value); // Fetch suggestions as user types
                            }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    submitCity();
                                }
                            }}
                        />
                    </div>
                    {suggestions.length > 0 && input && (
                        <div id="autocomplete-list" className="autocomplete-items">
                            {suggestions.map((city, index) => (
                                <div
                                    key={index}
                                    onClick={() => submitCity(city)}
                                    className="autocomplete-active"
                                >
                                    <strong>{city.substr(0, input.length)}</strong>
                                    {city.substr(input.length)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
            <BackgroundLayout></BackgroundLayout>
            <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
                <WeatherCard
                    place={thisLocation}
                    windspeed={weather.wspd}
                    humidity={weather.humidity}
                    temperature={weather.temp}
                    heatIndex={weather.heatindex}
                    iconString={weather.conditions}
                    conditions={weather.conditions}
                />

                <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                    {values?.slice(1, 7).map(curr => (
                        <MiniCard
                            key={curr.datetime}
                            time={curr.datetime}
                            temp={curr.temp}
                            iconString={curr.conditions}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
