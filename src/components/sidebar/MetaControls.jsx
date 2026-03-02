import { useContext } from 'react';
import { MetadataContext } from '_contexts/MetadataContext';
import { CanvasContext } from "_contexts/CanvasContext";

export default function MetaControls() {
  const mdContext= useContext(MetadataContext);
  const title= mdContext.mdState.title;
  const canvasRef= useContext(CanvasContext);

  const setTitle=(e)=>{
    mdContext.setMdState({...mdContext.mdState, title: e.target.value});
  };

  function handleClick(e){
    const dataURL= canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = title;
    
    link.click();
  }
  
  return (
    <div className="meta-controls">
      <input type="text" value={title} onInput={setTitle} placeholder='Title'></input>
      <button onClick={handleClick}>Export</button>
    </div>
  );
}
