import { useContext } from 'react';
import { ZoomContext } from "_contexts/CanvasContext";

export default function useZoom(zoomInCoefficient,zoomOutCoefficient ){
  const {scale, setScale}= useContext(ZoomContext);

  function zoomIn(){
    setScale(scale=> Math.min(scale*zoomInCoefficient, 10) );
  }
  
  function zoomOut(){
    setScale(scale=> Math.max(scale*zoomOutCoefficient, 0.1));
  }

  function zoomReset(){
    setScale(1);
  }
  
  return {scale, zoomIn, zoomOut, zoomReset };
}
