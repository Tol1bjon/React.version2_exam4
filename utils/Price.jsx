import React, { createContext, useState } from 'react';

export const FilterContext = createContext()

export const FilterProvider = ({children}) => {
    const [price, setPrice] = useState({ min: 0, max: 3000000 });

    return (
        <FilterContext.Provider value={{price, setPrice}}>
            {children}
        </FilterContext.Provider>
    )
}