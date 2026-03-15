import { useContext } from "react";
import ButtonSet from "_components/utility/ButtonSet";
import { ActiveToolContext,ToolOptionsContext } from "_contexts/ToolContexts";
import { ARC_SUBTOOLS } from "_constants/constants";
import fontList from "_constants/fonts";
import styles from './ToolBar.module.css';


const fillStroke=[{id: "stroke", label: "Stroke"},
                  {id: "fill", label: "Fill"},
                  {id: "both", label: "Both"}];
const arcDirection=[{label: "Clockwise"},{label: "Counter-Clockwise"}];
const arcSubtools = Object.keys(ARC_SUBTOOLS).map(
  key=> {return {
    id: key,
    label: ARC_SUBTOOLS[key].name
  } });
const toolShape=[{label: "Circle"},{label: "Square"}];
const halign= [{id: "left", label: "Left"},
               {id: "center", label: "Center"},
               {id: "right", label: "Right"}];
const valign= [{id: "top", label: "Bottom"},
               {id: "middle", label: "Middle"},
               {id: "bottom", label: "Top"}];

export default function ToolOptions() {
  const {activeTool} = useContext(ActiveToolContext); 
  const {toolOptions, dispatchToolOptions} = useContext(ToolOptionsContext);

  const fontOptionElements= fontList.map(font=>(<option key={font.value} value={font.value}>{font.name}</option>));
  
  return (
    <div className="tool-options">
      {["rectangle","circle","text"].includes(activeTool) && (
        <div className="fill-or-stroke">
          <ButtonSet buttons={fillStroke}
                     selectedIndex={ fillStroke.findIndex((x)=>x.id===toolOptions.fillStroke) }
                     onSelect={(i)=>dispatchToolOptions(
                       {type: "fillStroke" , value:  fillStroke[i].id })}/>
        </div>
      )}
      {"circle"===activeTool && (
        <div className="arc-type">
          <ButtonSet buttons={arcSubtools}
                     selectedIndex={ arcSubtools.findIndex((tool)=>tool.id===toolOptions.arcSubtool) }
                     onSelect={(i)=>dispatchToolOptions(
                       {type: "arcSubtool" , value: arcSubtools[i].id })}/>
        </div>
      )}
      {"circle"===activeTool && ["arc","segment","sector"].includes(toolOptions.arcSubtool) && (
        <div className="arc-options">
          <div className="arc-angles">
            <label>Start Angle</label>
            <input type="number" min="-360" max="360"
                   value={toolOptions.arcStart}
                   onChange={(e)=>dispatchToolOptions({
                     type: "arcStart",
                     value: Math.min(Math.max(Number(e.target.value), -360), 360)
                   })}/>
            <label>End Angle</label>
            <input type="number" min="-360" max="360"
                   value={toolOptions.arcEnd}
                   onChange={(e)=>dispatchToolOptions({
                     type: "arcEnd",
                     value: Math.min(Math.max(Number(e.target.value), -360), 360)
                   })}/>
          </div>
          <ButtonSet buttons={arcDirection}
                     selectedIndex={toolOptions.arcCC?1:0}
                     onSelect={(i)=>dispatchToolOptions({type: "arcCC" , value: (i===1) })}/>
        </div>
      )}
      { "pen"===activeTool && (
        <ButtonSet buttons={toolShape}
                   selectedIndex={toolOptions.shape==="square"?1:0}
                   onSelect={(i)=>dispatchToolOptions(
                     {type: "shape" , value: (i===1)?"square":"circle" }
                   )}/>
      )}
      { ["pen","eraser"].includes(activeTool) && (
        <div className="size">
          <label>Size</label>
          <input type="number"
                 value={toolOptions.size}
                 onChange={(e)=>dispatchToolOptions(
                   {type: "size", value: Number(e.target.value)}
                 )}/>
        </div>
      )}
      { "text"===activeTool && (
        <>
          <div className="text">
            <label>Text</label>
            <input type="text"
                   value={toolOptions.text}
                   onInput={(e)=>dispatchToolOptions({type: "text", value: e.target.value})}
                   placeholder='Enter text'/>
          </div>
          <div className="font-family">
            <label>Font</label>
            <select value={toolOptions.font}
                    onChange={(e)=>dispatchToolOptions({type: "font", value: e.target.value})}>
              {fontOptionElements}
            </select>
          </div>
            <div className={styles["text-options"]}>
            <div>
              <label>Size</label>
              <input type="number"
                     value={toolOptions.fontSize}
                     onInput={(e)=>dispatchToolOptions(
                       {type: "fontSize", value: Number(e.target.value)}
                     )}/>
            </div>
            <div className="button-checkbox">
              <label>
                Bold
                <input type="checkbox"
                       checked={toolOptions.bold}
                       onChange={(e)=>dispatchToolOptions({type: "bold", value: e.target.checked})}/>
              </label>
            </div>
            <div className="button-checkbox">
              <label>
                Italics
                <input type="checkbox"
                       checked={toolOptions.italics}
                       onChange={(e)=>dispatchToolOptions({type: "italics", value: e.target.checked})}/>
              </label>
            </div>
          </div>
          <div className="text-horizontal-align">
            <ButtonSet buttons={halign}
                       selectedIndex={ halign.findIndex((x)=>x.id===toolOptions.halign) }
                       onSelect={(i)=>dispatchToolOptions({type: "halign" , value: halign[i].id })}/>
          </div>
          <div className="text-vertical-align">
            <ButtonSet buttons={valign}
                       selectedIndex={ valign.findIndex((x)=>x.id===toolOptions.valign) }
                       onSelect={(i)=>dispatchToolOptions({type: "valign" , value: valign[i].id })}/>
          </div>
        </>
      )}
    </div>
  );
}
