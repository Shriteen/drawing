import useCanvasController from '_hooks/useCanvasController';

export default function StatusBar() {
  const { drawingState, handleCancel, handleCommit } = useCanvasController();


  
  return (
    <div className="statusbar">
      <span>status bar</span>
      { drawingState==="preview" &&
      <div className="commit-buttons">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleCommit}>Apply</button>
      </div>
      }
    </div>
  );
}
