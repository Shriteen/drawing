import { useContext } from "react";
import { ActiveToolContext,ToolDynamicOptionsContext } from "_contexts/ToolContexts";


export default function ToolDynamicOptions() {
  const {activeTool} = useContext(ActiveToolContext);    
  const {toolDynamicOptions, dispatchToolDynamicOptions} = useContext(ToolDynamicOptionsContext);
  
  return (
    <div className="tool-options">
        {["rectangle","circle","line","text"].includes(activeTool) && (
	  
      <div className="xy">
          <label>{{rectangle: "X", circle: "Center X", line: "Start X", text:"X"}[activeTool]}</label>
        <input type="number"
               value={toolDynamicOptions.x}
               onChange={(e)=>dispatchToolDynamicOptions(
                 {type: "x", value: Number(e.target.value)}
               )}/>
        <label>{{rectangle: "Y", circle: "Center Y", line: "Start Y", text:"Y"}[activeTool]}</label>
        <input type="number"
               value={toolDynamicOptions.y}
               onChange={(e)=>dispatchToolDynamicOptions(
                 {type: "y", value: Number(e.target.value)}
               )}/>
      </div>
      )}
      {"rectangle"===activeTool && (	  
      <div className="width-height">
        <label>Width</label>
        <input type="number"
               value={toolDynamicOptions.width}
               onChange={(e)=>dispatchToolDynamicOptions(
                 {type: "w", value: Number(e.target.value)}
               )}/>
        <label>Height</label>
        <input type="number"
               value={toolDynamicOptions.height}
               onChange={(e)=>dispatchToolDynamicOptions(
                 {type: "h", value: Number(e.target.value)}
               )}/>
      </div>
      )}
      {"circle"===activeTool  && (
        <div className="radius">
          <label>Radius</label>
          <input type="number"
                 value={toolDynamicOptions.radius}
                 onChange={(e)=>dispatchToolDynamicOptions(
                   {type: "rad", value: Number(e.target.value)}
                 )}/>
        </div>
      )}
      {["line"].includes(activeTool) && (
        <div className="end-xy">
          <label>End X</label>
          <input type="number"
                 value={toolDynamicOptions.endX}
                 onChange={(e)=>dispatchToolDynamicOptions(
                   {type: "endX", value: Number(e.target.value)}
                 )}/>
          <label>End Y</label>
          <input type="number"
                 value={toolDynamicOptions.endY}
                 onChange={(e)=>dispatchToolDynamicOptions(
                   {type: "endY", value: Number(e.target.value)}
                 )}/>
        </div>
      )}
    </div>
  );
}
