import { useContext } from "react";
import { CanvasContext, PreviewCanvasContext } from "_contexts/CanvasContext";
import usePreviewController from "_hooks/usePreviewController";

export default function Canvas() {
  const canvasRef= useContext(CanvasContext);  
  const previewCanvasRef= useContext(PreviewCanvasContext);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    drawingState,
    activeTool
  } = usePreviewController(canvasRef, previewCanvasRef);  
  
  return (
    <div className="canvas-container" style={{width:750, height:500}}>
      <canvas className="canvas canvas-main" ref={canvasRef}
              style={(activeTool==="eraser" && drawingState!=="synced")?{visibility:"hidden"}:{}}
              width={750} height={500}></canvas>
      <canvas className="canvas canvas-preview" ref={previewCanvasRef} width={750} height={500}
              onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}></canvas>
    </div>
  );
}
