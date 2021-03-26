import React, { useContext, useState } from 'react';
import { Genre, PageProps } from 'types';

type AppContextType = {
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
};
const defaultFunc = () => {};
const contextDefaultValues: AppContextType = {
  genres: [],
  setGenres: defaultFunc,
};
export const AppContext = React.createContext<AppContextType>(contextDefaultValues);
export const AppContextProvider = ({ children }: PageProps) => {
  const [genres, setGenres] = useState<Genre[]>(contextDefaultValues.genres);
  return <AppContext.Provider value={{ genres, setGenres }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
