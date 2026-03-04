import { useContext } from "react";
import { CanvasContext, PreviewCanvasContext } from "_contexts/CanvasContext";
import usePreviewController from "_hooks/usePreviewController";

export default function Canvas({zoom}) {
  const canvasRef= useContext(CanvasContext);  
  const previewCanvasRef= useContext(PreviewCanvasContext);

  const width=800;
  const height=500;
  
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    drawingState,
    activeTool
  } = usePreviewController(canvasRef, previewCanvasRef);  
  
  return (
    <div className="canvas-container" style={{width, height, zoom}}>
      <canvas className="canvas canvas-main" ref={canvasRef}
              style={(activeTool==="eraser" && drawingState!=="synced")?{visibility:"hidden"}:{}}
              width={width} height={height}></canvas>
      <canvas className="canvas canvas-preview" ref={previewCanvasRef} width={width} height={height}
              onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}></canvas>
    </div>
  );
}
