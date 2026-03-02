import { createContext, useState, useMemo } from 'react';

function colorContextFactory(initialState){
    const context = createContext({});

    function contextProvider({children}){
	const [colorStyle, setColorStyle] =useState(initialState);
	
	const value = useMemo(() => ({
	    colorStyle, setColorStyle
	}), [colorStyle]);
	
	return (
	    <context.Provider value={value}>
		{children}
	    </context.Provider>
	);
    }

    return {context, contextProvider};
}


const LineContext = createContext({lineState:{width:1 , style: "continous" }});
function LineContextProvider({children}){

  const [lineState, setLineState] =useState({
    width: 1,
    style: "continous"
  })

  const value = useMemo(() => ({
    lineState,setLineState
  }), [lineState]);
  
  return (
    <LineContext.Provider value={value}>
      {children}
    </LineContext.Provider>
  );
}


const {context: FillStyleContext, contextProvider: FillStyleContextProvider}= colorContextFactory({
  mode: "solid",
  primaryColor: {r:0, g:0, b:0, a:1},
  secondaryColor: {r:255, g:255, b:255, a:1},
  sourcePoint: {x: 0, y:0, r: 200},
  targetPoint: {x: 100, y:100, r: 10}
});

const {context: StrokeStyleContext, contextProvider: StrokeStyleContextProvider}= colorContextFactory({
  mode: "solid",
  primaryColor: {r:0, g:0, b:0, a:1},
  secondaryColor: {r:255, g:255, b:255, a:1},
  sourcePoint: {x: 0, y:0, r: 200},
  targetPoint: {x: 100, y:100, r: 10}
});

export {
    FillStyleContext,
    FillStyleContextProvider,
    StrokeStyleContext,
    StrokeStyleContextProvider,
    LineContext,
    LineContextProvider
};
