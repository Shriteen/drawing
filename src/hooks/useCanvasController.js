import { useContext } from "react";
import { CanvasContext, PreviewCanvasContext } from "_contexts/CanvasContext";

import { DrawingContext } from '_contexts/CanvasContext';
import { ActiveToolContext,ToolOptionsContext,ToolDynamicOptionsContext } from "_contexts/ToolContexts";

import { clearCanvas} from "_services/draw";
import previewServices from "_services/preview/previewServices";

export default function useCanvasController(){
    const canvasRef= useContext(CanvasContext);  
    const previewCanvasRef= useContext(PreviewCanvasContext);
    
    const { drawingState, setDrawingState } = useContext(DrawingContext);
    const {activeTool} = useContext(ActiveToolContext);

    
    
    function handleCancel(e){
	const pctx= previewCanvasRef.current.getContext("2d");
	clearCanvas(pctx);
	setDrawingState("synced");
    }

    function handleCommit(e){
	const pctx= previewCanvasRef.current.getContext("2d");
	const ctx= canvasRef.current.getContext("2d");

	previewServices[activeTool]?.commit(pctx,ctx);
	clearCanvas(pctx);
	
	setDrawingState("synced");
    }
    
    
    return { handleCancel, handleCommit, drawingState };
}
