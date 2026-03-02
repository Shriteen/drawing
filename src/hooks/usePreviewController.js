import { useContext, useEffect, useRef, useEffect } from "react";

import { DrawingContext } from '_contexts/CanvasContext';
import { ActiveToolContext,ToolOptionsContext,ToolDynamicOptionsContext } from "_contexts/ToolContexts";
import { FillStyleContext, StrokeStyleContext, LineContext } from '_contexts/StylingContexts';

import previewServices from "_services/preview/previewServices";
import {drawTool, clearCanvas} from "_services/draw";


export default function usePreviewController(canvasRef, previewCanvasRef){
    const { drawingState, setDrawingState } = useContext(DrawingContext);
    const { toolDynamicOptions, dispatchToolDynamicOptions } = useContext(ToolDynamicOptionsContext);
    const { toolOptions } = useContext(ToolOptionsContext);
    const {activeTool} = useContext(ActiveToolContext);

    const {colorStyle:fillStyle, setColorStyle: setFillStyle}= useContext(FillStyleContext);
    const {colorStyle:strokeStyle, setColorStyle: setStrokeStyle}= useContext(StrokeStyleContext);
    const {lineState}= useContext(LineContext);

    
    const pendingUpdate = useRef(false); // Ref to track if RAF is scheduled
    const latestCoords = useRef({ x: 0, y: 0 });

    
    function handleMouseDown(e){
	
	if(drawingState!=="drawing"){
	    setDrawingState("drawing");
	    
	    const ctx= e.target.getContext("2d");
	    const updates= previewServices[activeTool]?.onDraw(e.clientX, e.clientY, e.target, toolDynamicOptions, dispatchToolDynamicOptions);
	    if(drawingState==="synced")
		previewServices[activeTool]?.reset(ctx, canvasRef.current.getContext("2d"));
	    else
		previewServices[activeTool]?.clear(ctx);

	    previewServices[activeTool]?.setColorStartPos(
		e.clientX, e.clientY, e.target,
		{fillStyle, setFillStyle}
	    );
	    
	    drawTool(activeTool, ctx, {...toolOptions, ...toolDynamicOptions, ...updates});
	}
    }

    function handleMouseUp(e){
	if(drawingState==="drawing"){
	    setDrawingState("preview");

	    previewServices[activeTool]?.setColorEndPos(
		e.clientX, e.clientY, e.target,
		{fillStyle, setFillStyle}
	    );

	}
    }

    function handleMouseMove(e){
	if(drawingState==="drawing"){
	    latestCoords.current = { x: e.clientX, y: e.clientY };
	    
	    if(!pendingUpdate.current){
		pendingUpdate.current=true;		
		
		requestAnimationFrame(() => {

		    const ctx= e.target.getContext("2d");
		    const updates= previewServices[activeTool]?.handleFrame(
			latestCoords.current.x,
			latestCoords.current.y,
			e.target,
			toolDynamicOptions,
			dispatchToolDynamicOptions
		    );

		    previewServices[activeTool]?.clear(ctx);
		    drawTool(activeTool, ctx, {...toolOptions, ...toolDynamicOptions, ...updates});
		    		    
		    pendingUpdate.current = false;
		});
	    }	    

	}
    }

    useEffect(()=>{
	const ctx=previewCanvasRef.current?.getContext?.("2d");
	if(drawingState==="preview"){
	    if(ctx){
		previewServices[activeTool]?.clear(ctx);
		drawTool(activeTool, ctx,{...toolOptions, ...toolDynamicOptions});
	    }
	}else if(drawingState==="synced"){
	    if(ctx)
		clearCanvas(ctx);
	}
	
    },[drawingState, activeTool, toolOptions, toolDynamicOptions, fillStyle,strokeStyle,lineState]);
    
    return { handleMouseDown, handleMouseMove, handleMouseUp, drawingState, activeTool };
}
