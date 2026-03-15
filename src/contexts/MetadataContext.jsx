import { createContext, useMemo, useContext } from 'react';
import {AppContext} from '_contexts/AppContext.jsx';


export const MetadataContext = createContext({});

export function MetadataContextProvider({children, id}){

  const { appMdState, setAppMdState} = useContext(AppContext);
  const mdState =appMdState.filter(mdState=> mdState.id===id)[0];
  
  function setMdState(state){
    const newState= appMdState.map(mdState=> (mdState.id===id)? state : mdState);
    setAppMdState(newState);
  }

  const value = useMemo(() => ({
    mdState,setMdState
  }), [mdState, appMdState]);
  
  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
}
