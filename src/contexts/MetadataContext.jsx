import { createContext, useState, useMemo } from 'react';

export const MetadataContext = createContext({});

export function MetadataContextProvider({children, initialTitle}){

  const [mdState, setMdState] =useState({
    title: initialTitle ?? 'Untitled'
  })

  const value = useMemo(() => ({
    mdState: mdState,setMdState: setMdState
  }), [mdState]);
  
  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
}
