import useZoom from '_hooks/useZoom';
import useCanvasController from '_hooks/useCanvasController';

export default function SpaceTimeControls() {
  const { handleUndo, handleRedo, canUndo, canRedo } = useCanvasController();
  const {scale, zoomIn, zoomOut, zoomReset}= useZoom(1.25, 0.8);
  
  return (
    <div className="spacetime-controls">
      <button disabled={!canUndo} onClick={handleUndo}>Undo</button>
      <button disabled={!canRedo} onClick={handleRedo}>Redo</button>
      <div className="zoom-controls">
        <label>Zoom</label>
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomReset}>{(scale*100).toFixed(2)}%</button>
        <button onClick={zoomOut}>-</button>
      </div>
    </div>
  );
}
