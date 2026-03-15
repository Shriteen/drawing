import { createContext, useState, useMemo } from 'react';
import numberGenerator from '_services/numberGenerator';

export const AppContext = createContext({});

export function AppContextProvider({children}){

  const [appMdState, setAppMdState] =useState(()=>[{
    id: numberGenerator.next().value,
    title: 'Untitled',
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
