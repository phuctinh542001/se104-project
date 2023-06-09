import { createContext } from 'react';

export const IdContext = createContext(0);
export const HandleUpdateContext = createContext((id: number)=>{});
export const HandleDeleteContext = createContext((id: number)=>{});

