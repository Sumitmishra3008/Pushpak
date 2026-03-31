import { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [ captain, setCaptain ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    // Backwards-compatible aliases used across the app
    const captainData = captain;
    const setCaptainData = (data) => setCaptain(data);

    const value = {
        // primary API
        captain,
        setCaptain,
        updateCaptain,
        // backwards-compatible API
        captainData,
        setCaptainData,
        // shared flags
        isLoading,
        setIsLoading,
        error,
        setError,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;