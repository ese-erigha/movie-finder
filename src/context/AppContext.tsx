import React, { useState } from 'react';
import { PageProps } from 'types';

type AppContextType = {
  page: number | null;
  setPage: (page: number) => void;
};
const contextDefaultValues: AppContextType = {
  page: null,
  setPage: () => {},
};

export const AppContext = React.createContext<AppContextType>(contextDefaultValues);
export const AppContextProvider = ({ children }: PageProps) => {
  const [page, setPage] = useState<number | null>(contextDefaultValues.page);
  return <AppContext.Provider value={{ page, setPage }}>{children}</AppContext.Provider>;
};
