import { useContext } from "react";
import { ActiveToolContext,ToolDynamicOptionsContext } from "_contexts/ToolContexts";
import styles from './ToolBar.module.css';

export default function ToolDynamicOptions() {
  const {activeTool} = useContext(ActiveToolContext);    
  const {toolDynamicOptions, dispatchToolDynamicOptions} = useContext(ToolDynamicOptionsContext);
  
  return (
    <div className={styles["tool-options"]+" "+styles["dynamic"]}>
      {["rectangle","circle","line","text"].includes(activeTool) && (
        <>
          <div className={styles.x}>
            <label>{{rectangle: "X", circle: "Center X", line: "Start X", text:"X"}[activeTool]}</label>
            <input type="number"
                   value={toolDynamicOptions.x}
                   onChange={(e)=>dispatchToolDynamicOptions(
                     {type: "x", value: Number(e.target.value)}
                   )}/>
          </div>
          <div className={styles.y}>
            <label>{{rectangle: "Y", circle: "Center Y", line: "Start Y", text:"Y"}[activeTool]}</label>
            <input type="number"
                   value={toolDynamicOptions.y}
                   onChange={(e)=>dispatchToolDynamicOptions(
                     {type: "y", value: Number(e.target.value)}
                   )}/>
          </div>
        </>
      )}
      {"rectangle"===activeTool && (
        <>
          <div className={styles["width"]}>
            <label>Width</label>
            <input type="number"
                   value={toolDynamicOptions.width}
                   onChange={(e)=>dispatchToolDynamicOptions(
                     {type: "w", value: Number(e.target.value)}
                   )}/>
          </div>
          <div className={styles["height"]}>
            <label>Height</label>
            <input type="number"
                   value={toolDynamicOptions.height}
                   onChange={(e)=>dispatchToolDynamicOptions(
                     {type: "h", value: Number(e.target.value)}
                   )}/>
          </div>
        </>
    )}
      {"circle"===activeTool  && (
        <div className={styles.radius}>
          <label>Radius</label>
          <input type="number"
                 value={toolDynamicOptions.radius}
                 onChange={(e)=>dispatchToolDynamicOptions(
                   {type: "rad", value: Math.max(Number(e.target.value),0)}
                 )}/>
        </div>
      )}
      {["line"].includes(activeTool) && (
        <>
          <div className="end-x">
            <label>End X</label>
            <input type="number"
                   value={toolDynamicOptions.endX}
                   onChange={(e)=>dispatchToolDynamicOptions(
                     {type: "endX", value: Number(e.target.value)}
                   )}/>
          </div>
          <div className="end-y">
            <label>End Y</label>
            <input type="number"
                   value={toolDynamicOptions.endY}
                   onChange={(e)=>dispatchToolDynamicOptions(
                     {type: "endY", value: Number(e.target.value)}
                   )}/>
          </div>
        </>
      )}
    </div>
  );
}
