import { useEffect, useRef } from "react";
import useZoom from '_hooks/useZoom';
import Canvas from '_components/Canvas';
import styles from './Canvas.module.css';

export default function ViewPort() {
  const {scale, zoomIn, zoomOut}= useZoom(1.05, 0.95);  

  const viewportRef= useRef();

  useEffect(() => {
    const viewport = viewportRef.current;

    const handleWheel = (e) => {
      // ctrlKey is true for pinches. 
      if (e.ctrlKey) {
        e.preventDefault();

        if(e.deltaY < 0)
          zoomIn();
        else
          zoomOut();
      }
    };
    viewport.addEventListener('wheel', handleWheel, { passive: false });

    return () => viewport.removeEventListener('wheel', handleWheel);
  }, []);
  
  return (
    <div className={styles.viewport} ref={viewportRef}>
      <Canvas zoom={scale}/>
    </div>
  );
}
