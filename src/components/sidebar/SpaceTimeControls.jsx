import useZoom from '_hooks/useZoom';
import useCanvasController from '_hooks/useCanvasController';
import styles from '../SideBar.module.css';


export default function SpaceTimeControls() {
  const { handleUndo, handleRedo, canUndo, canRedo, handleReset } = useCanvasController();
  const {scale, zoomIn, zoomOut, zoomReset}= useZoom(1.25, 0.8);
  
  return (
    <div className={styles["spacetime-controls"]}>
      <div className={styles["undo-redo-controls"]}>
        <button disabled={!canUndo} onClick={handleUndo}>Undo</button>
        <button disabled={!canRedo} onClick={handleRedo}>Redo</button>
        <button onClick={handleReset}>Reset</button>
      </div>      
      <div className={styles["zoom-controls"]}>
        <label>Zoom</label>
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomReset}>{(scale*100).toFixed(2)}%</button>
        <button onClick={zoomOut}>-</button>
      </div>
    </div>
  );
}
