import { createContext, useState, useMemo, useReducer } from 'react';

export const ActiveToolContext = createContext(null);

export function ActiveToolContextProvider({children}){

  const [activeTool, setActiveTool] =useState(null);
    
  const value =  useMemo(() => ({
    activeTool, setActiveTool
  }), [activeTool]);
        
  return (
    <ActiveToolContext.Provider value={value}>
      {children}
    </ActiveToolContext.Provider>
  );
}


function toolOptionReducer(state, action){
  switch(action.type){
  case "fillStroke":
    return {...state, fillStroke: action.value};
  case "arcSubtool":
    return {...state, arcSubtool: action.value};
  case "arcStart":
    return {...state, arcStart: action.value};
  case "arcEnd":
    return {...state, arcEnd: action.value};
  case "arcCC":
    return {...state, arcCC: action.value};
  case "size":
    return {...state, size: action.value};
  case "shape":
    return {...state, shape: action.value};
  case "text":
    return {...state, text: action.value};
  case "font":
    return {...state, font: action.value};
  case "fontSize":
    return {...state, fontSize: action.value};
  case "bold":
    return {...state, bold: action.value};
  case "italics":
    return {...state, italics: action.value};
  case "halign":
    return {...state, halign: action.value};
  case "valign":
    return {...state, valign: action.value};
  default: return state;
  }
}

export const ToolOptionsContext = createContext(null);

export function ToolOptionsContextProvider({children}){

  const [toolOptions, dispatchToolOptions ] =useReducer( toolOptionReducer,{
    fillStroke: "stroke",
    arcSubtool: "circle",
    arcStart: 45,
    arcEnd: -45,
    arcCC: false,
    size: 5,
    shape: "circle",
    text: "lorem ipsum",
    font: "sans-serif",
    fontSize: "30",
    bold: false,
    italics: false,
    halign: "left",
    valign: "bottom"
  });
    
  const value =  useMemo(() => ({
    toolOptions, dispatchToolOptions
  }), [toolOptions]);
        
  return (
    <ToolOptionsContext.Provider value={value}>
      {children}
    </ToolOptionsContext.Provider>
  );
}


function toolDynamicOptionReducer(state, action){
  switch(action.type){
  case "x":
    return {...state, x: action.value};
  case "y":
    return {...state, y: action.value};
  case "xy":
    return {...state, x: action.x, y: action.y};
  case "w":
    return {...state, width: action.value};
  case "h":
    return {...state, height: action.value};
  case "wh":
    return {...state, width: action.w , height: action.h};
  case "rad":
    return {...state, radius: action.value};
  case "endX":
    return {...state, endX: action.value};
  case "endY":
    return {...state, endY: action.value};
  case "end":
    return {...state, endX: action.endX, endY: action.endY};
  default:
    return state;
  }
}

export const ToolDynamicOptionsContext = createContext(null);

export function ToolDynamicOptionsContextProvider({children}){

  const [toolDynamicOptions, dispatchToolDynamicOptions ] =useReducer(toolDynamicOptionReducer,{
    x:0,
    y:0,
    width: 100,
    height: 100,
    radius: 50,
    endX: 100,
    endY: 100
  });
    
  const value =  useMemo(() => ({
    toolDynamicOptions, dispatchToolDynamicOptions
  }), [toolDynamicOptions]);
        
  return (
    <ToolDynamicOptionsContext.Provider value={value}>
      {children}
    </ToolDynamicOptionsContext.Provider>
  );
}
