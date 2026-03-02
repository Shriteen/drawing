import { useContext } from 'react';
// import { MetadataContext } from '_contexts/MetadataContext';

export default function SpaceTimeControls() {
  //const wsContext= useContext(MetadataContext);
  
  return (
    <div className="spacetime-controls">
      <button>Undo</button>
      <button>Redo</button>
      <button>+</button>
      <button>-</button>
    </div>
  );
}
