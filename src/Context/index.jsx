// index.jsx

import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Jaipur');
    const [thisLocation, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]); // City suggestions

    // Fetch weather data based on the selected city
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': '8f920f2c38msh0ba42c1ad461ce7p1983bbjsn4c128cd46354',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const thisData = Object.values(response.data.locations)[0];
            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0]);
        } catch (e) {
            console.error(e);
            alert('This place does not exist');
        }
    };

    // Fetch city suggestions from GeoDB Cities API
    const fetchCitySuggestions = async (input) => {
        const options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
            params: {
                namePrefix: input,
                limit: 5,
                sort: '-population',
                countryIds: 'IN', // Only Indian cities
            },
            headers: {
                'X-RapidAPI-Key': '8f920f2c38msh0ba42c1ad461ce7p1983bbjsn4c128cd46354',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const cities = response.data.data.map(city => city.city);
            setSuggestions(cities);
        } catch (e) {
            console.error(e);
            setSuggestions([]);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place,
            suggestions,
            fetchCitySuggestions
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
