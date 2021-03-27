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
const AppContextProvider = ({ children }: PageProps) => {
  const [genres, setGenres] = useState<Genre[]>(contextDefaultValues.genres);
  return <AppContext.Provider value={{ genres, setGenres }}>{children}</AppContext.Provider>;
};
export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);
