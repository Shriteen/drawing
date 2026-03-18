import { BiUndo, BiRedo, BiReset, BiZoomIn, BiZoomOut } from "react-icons/bi";
import useZoom from '_hooks/useZoom';
import useCanvasController from '_hooks/useCanvasController';
import styles from '../SideBar.module.css';


export default function SpaceTimeControls() {
  const { handleUndo, handleRedo, canUndo, canRedo, handleReset } = useCanvasController();
  const {scale, zoomIn, zoomOut, zoomReset}= useZoom(1.25, 0.8);
  
  return (
    <div className={styles["spacetime-controls"]}>
      <div className={styles["undo-redo-controls"]}>
        <button disabled={!canUndo} onClick={handleUndo} title="Undo"><BiUndo/></button>
        <button disabled={!canRedo} onClick={handleRedo} title="Redo"><BiRedo/></button>
        <button onClick={handleReset} title="Clear Canvas"><BiReset/></button>
      </div>      
      <div className={styles["zoom-controls"]}>
        <button className={styles["zoom-in"]} onClick={zoomIn} disabled={scale>=10} title="Zoom In"><BiZoomIn/></button>
        <button onClick={zoomReset} disabled={scale==1} title="Reset Zoom">{(scale*100).toFixed(2)}%</button>
        <button className={styles["zoom-out"]} onClick={zoomOut} disabled={scale<=0.1} title="Zoom Out"><BiZoomOut/></button>
      </div>
    </div>
  );
}
