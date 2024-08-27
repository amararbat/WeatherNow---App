import { useEffect, useState } from "react";

export const useDate = () => {
    const locale = 'en-IN';  // Set the locale to Indian format
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const date = today.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const time = today.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return {
        date,
        time
    };
};
