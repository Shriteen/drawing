import { createContext, useRef, useState, useMemo } from 'react';

export const CanvasContext = createContext({});

export function CanvasContextProvider({children}){

  const canvasRef=useRef(undefined);
    
  return (
    <CanvasContext.Provider value={canvasRef}>
      {children}
    </CanvasContext.Provider>
  );
}

export const PreviewCanvasContext = createContext({});

export function PreviewCanvasContextProvider({children}){

  const previewCanvasRef=useRef(undefined);
    
  return (
    <PreviewCanvasContext.Provider value={previewCanvasRef}>
      {children}
    </PreviewCanvasContext.Provider>
  );
}


export const DrawingContext = createContext({});

export function DrawingContextProvider({children}){

  const [drawingState, setDrawingState] =useState("synced")

  const value = useMemo(() => ({
    drawingState, setDrawingState
  }), [drawingState]);
  
  return (
    <DrawingContext.Provider value={value}>
      {children}
    </DrawingContext.Provider>
  );
}

export const ZoomContext = createContext({});

export function ZoomContextProvider({children}){
  const [scale, setScale] =useState(1);

  const value = useMemo(() => ({ scale, setScale }), [scale]);
  
  return (
    <ZoomContext.Provider value={value}>
      {children}
    </ZoomContext.Provider>
  );
}
