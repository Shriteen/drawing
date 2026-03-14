import { useContext } from "react";
import { CanvasContext, PreviewCanvasContext, DrawingContext } from "_contexts/CanvasContext";

import { ActiveToolContext } from "_contexts/ToolContexts";
import { HistoryContext } from "_contexts/HistoryContext";

import { clearCanvas} from "_services/draw";
import previewServices from "_services/preview/previewServices";

export default function useCanvasController(){
    const canvasRef= useContext(CanvasContext);  
    const previewCanvasRef= useContext(PreviewCanvasContext);
    const {undoStack, setUndoStack, redoStack, setRedoStack}= useContext(HistoryContext);
    
    const { drawingState, setDrawingState } = useContext(DrawingContext);
    const {activeTool} = useContext(ActiveToolContext);

    async function push(){
	const state= await createImageBitmap(canvasRef.current);
	if(undoStack.length<7)
	    setUndoStack([...undoStack, state]);
	else{
	    const newStack= undoStack.slice(1);
	    newStack.push(state);
	    setUndoStack(newStack);	    
	}
	setRedoStack([]);
    }
    
    function handleCancel(){
	const pctx= previewCanvasRef.current.getContext("2d");
	clearCanvas(pctx);
	setDrawingState("synced");
    }

    function handleCommit(){
	const pctx= previewCanvasRef.current.getContext("2d");
	const ctx= canvasRef.current.getContext("2d");

	previewServices[activeTool]?.commit(pctx,ctx);
	clearCanvas(pctx);

	push();
	setDrawingState("synced");
    }

    async function handleUndo(){
	handleCancel();

	if(undoStack.length>1){
	    const currentState= undoStack[undoStack.length - 1];
	    const prevState= undoStack[undoStack.length - 2];
	    setRedoStack([...redoStack, currentState]);

	    const ctx= canvasRef.current.getContext("2d");
	    clearCanvas(ctx);
	    ctx.drawImage(prevState,0,0);
	    setUndoStack(undoStack.slice(0, -1));
	}else{
	    console.warn("Undo called without states to restore")
	}
    }

    async function handleRedo(){
	handleCancel();
	
	if(redoStack.length>0){
	    const restoreState= redoStack[redoStack.length - 1];
	    setRedoStack(redoStack.slice(0, -1));

	    const ctx= canvasRef.current.getContext("2d");
	    clearCanvas(ctx);
	    ctx.drawImage(restoreState,0,0);
	    setUndoStack([...undoStack, restoreState]);
	}else{
	    console.warn("Redo called without states to restore")
	}
    }
    
    
    return {
	handleCancel,
	handleCommit,
	drawingState,
	handleUndo,
	handleRedo,
	canUndo: undoStack.length>1,
	canRedo: redoStack.length>0
    };
}
