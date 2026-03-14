import { createContext, useState, useMemo } from 'react';

export const HistoryContext = createContext({});

export function HistoryContextProvider({children}){

  const [undoStack, setUndoStack] =useState([])
  const [redoStack, setRedoStack] =useState([])

  const value = useMemo(() => ({
    undoStack, setUndoStack, redoStack, setRedoStack
  }), [undoStack, redoStack]);
  
  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
}
