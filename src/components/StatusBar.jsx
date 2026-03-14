import { useContext } from "react";
import useCanvasController from '_hooks/useCanvasController';
import { ActiveToolContext } from "_contexts/ToolContexts";
import {TOOL_MESSAGES} from "_constants/constants";

export default function StatusBar() {
  const { drawingState, handleCancel, handleCommit } = useCanvasController();
  const {activeTool} = useContext(ActiveToolContext);

  
  return (
    <div className="statusbar">
      <span>{activeTool}</span>
      <span>{TOOL_MESSAGES[activeTool][drawingState]}</span>
      <div className="end-items">
        <span className='drawing-state'>{drawingState}</span>
        { drawingState==="preview" &&
          <div className="commit-buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleCommit}>Apply</button>
          </div>
        }
      </div>
    </div>
  );
}
