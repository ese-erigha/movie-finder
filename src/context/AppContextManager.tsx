import React, { useContext, useState } from 'react';
import { Genre, PageProps } from 'types';

type AppContextType = {
  query: string;
  setQuery: (query: string) => void;
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
};
const defaultFunc = () => {};
const contextDefaultValues: AppContextType = {
  query: '',
  setQuery: defaultFunc,
  genres: [],
  setGenres: defaultFunc,
};
export const AppContext = React.createContext<AppContextType>(contextDefaultValues);
export const AppContextProvider = ({ children }: PageProps) => {
  const [genres, setGenres] = useState<Genre[]>(contextDefaultValues.genres);
  const [query, setQuery] = useState<string>(contextDefaultValues.query);
  return (
    <AppContext.Provider value={{ genres, setGenres, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
