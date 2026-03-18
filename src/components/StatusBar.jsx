import { useContext } from "react";
import { BiBlock, BiCheckDouble } from "react-icons/bi";
import useCanvasController from '_hooks/useCanvasController';
import { ActiveToolContext } from "_contexts/ToolContexts";
import {TOOL_MESSAGES} from "_constants/constants";
import styles from './StatusBar.module.css';

export default function StatusBar() {
  const { drawingState, handleCancel, handleCommit } = useCanvasController();
  const {activeTool} = useContext(ActiveToolContext);

  
  return (
    <div className={styles.statusbar}>
      <span className={styles["active-tool"]} style={activeTool?{}:{visibility: "hidden"}}>{activeTool}</span>
      <span className={styles["tool-message"]}>{TOOL_MESSAGES[activeTool][drawingState]}</span>
      <div className={styles["end-items"]}>
        <span className={styles['drawing-state']}>{drawingState}</span>
        { drawingState==="preview" &&
          <div className={styles["commit-buttons"]}>
            <button className={styles["cancel-button"]} onClick={handleCancel}>Cancel<BiBlock/></button>
            <button className={styles["apply-button"]} onClick={handleCommit}>Apply<BiCheckDouble/></button>
          </div>
        }
      </div>
    </div>
  );
}
