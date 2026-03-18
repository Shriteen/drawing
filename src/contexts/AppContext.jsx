import { createContext, useState, useMemo } from 'react';
import numberGenerator from '_services/numberGenerator';
import getNewTabName from "_services/tabName";

export const AppContext = createContext({});

export function AppContextProvider({children}){

  const [appMdState, setAppMdState] =useState(()=>[{
    id: numberGenerator.next().value,
    title: getNewTabName(),
  }]);

  const [activeTabId, setActiveTabId]=useState(appMdState[0].id);

  const value = useMemo(() => ({
    appMdState, setAppMdState,activeTabId,setActiveTabId
  }), [appMdState, activeTabId]);
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
