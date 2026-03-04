import useZoom from '_hooks/useZoom';

export default function SpaceTimeControls() {
  const {scale, zoomIn, zoomOut, zoomReset}= useZoom(1.25, 0.8);
  
  return (
    <div className="spacetime-controls">
      <button>Undo</button>
      <button>Redo</button>
      <div className="zoom-controls">
        <label>Zoom</label>
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomReset}>{(scale*100).toFixed(2)}%</button>
        <button onClick={zoomOut}>-</button>
      </div>
    </div>
  );
}
