import { useContext } from "react";
import * as icons from "react-icons/bi";
import { BiText, BiFontFamily, BiFontSize, BiBold, BiItalic } from "react-icons/bi";
import ButtonSet from "_components/utility/ButtonSet";
import { ActiveToolContext,ToolOptionsContext } from "_contexts/ToolContexts";
import { ARC_SUBTOOLS } from "_constants/constants";
import fontList from "_constants/fonts";
import styles from './ToolBar.module.css';


const fillStroke=[{id: "stroke", label: "Stroke"},
                  {id: "fill", label: "Fill"},
                  {id: "both", label: "Both"}];
const arcDirection=[
  {
    label: "Clockwise",
    reactIcon: icons["BiRotateRight"],
    displayMode: "icon-only",
    tooltip:"Clockwise"
  },
  {
    label: "Counter-Clockwise",
    reactIcon: icons["BiRotateLeft"],
    displayMode: "icon-only",
    tooltip:"Counter-Clockwise"    
  }
];
const arcSubtools = Object.keys(ARC_SUBTOOLS).map(
  key=> {return {
    id: key,
    label: ARC_SUBTOOLS[key].name,
    reactIcon: icons[ARC_SUBTOOLS[key].reactIcon],
    displayMode: "icon-label"
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
    <div className={styles["tool-options"]}>
      {["rectangle","circle","text"].includes(activeTool) && (
        <div className={styles["fill-or-stroke"]}>
          <ButtonSet buttons={fillStroke}
                     selectedIndex={ fillStroke.findIndex((x)=>x.id===toolOptions.fillStroke) }
                     onSelect={(i)=>dispatchToolOptions(
                       {type: "fillStroke" , value:  fillStroke[i].id })}/>
        </div>
      )}
      {"circle"===activeTool && (
        <div className={styles["arc-type"]}>
          <ButtonSet buttons={arcSubtools}
                     selectedIndex={ arcSubtools.findIndex((tool)=>tool.id===toolOptions.arcSubtool) }
                     onSelect={(i)=>dispatchToolOptions(
                       {type: "arcSubtool" , value: arcSubtools[i].id })}/>
        </div>
      )}
      {"circle"===activeTool && ["arc","segment","sector"].includes(toolOptions.arcSubtool) && (
        <div className={styles["arc-options"]}>
          <div className={styles["arc-angles"]}>
            <div title="Start angle in degrees">
              <label>Start ∡</label>
              <input type="number" min="-360" max="360"
                     value={toolOptions.arcStart}
                     onChange={(e)=>dispatchToolOptions({
                       type: "arcStart",
                       value: Math.min(Math.max(Number(e.target.value), -360), 360)
                     })}/>
            </div>
            <div title="End angle in degrees">            
              <label>End ∡</label>
              <input type="number" min="-360" max="360"
                     value={toolOptions.arcEnd}
                     onChange={(e)=>dispatchToolOptions({
                       type: "arcEnd",
                       value: Math.min(Math.max(Number(e.target.value), -360), 360)
                     })}/>
            </div>
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
        <div className={styles.size}>
          <div>
            <label>Size</label>
            <input type="number"
                   value={toolOptions.size}
                   onChange={(e)=>dispatchToolOptions(
                     {type: "size", value: Number(e.target.value)}
                   )}/>
          </div>
        </div>
      )}
      { "text"===activeTool && (
        <>
          <div className={styles["text-options"]}>
            <div className={styles.text}>
              <label><BiText/>Text</label>
              <input type="text"
                     value={toolOptions.text}
                     onInput={(e)=>dispatchToolOptions({type: "text", value: e.target.value})}
                     placeholder='Enter text'/>
            </div>
            <div className={styles["font-family"]}>
              <label><BiFontFamily/>Font</label>
              <select value={toolOptions.font}
                      onChange={(e)=>dispatchToolOptions({type: "font", value: e.target.value})}>
                {fontOptionElements}
              </select>
            </div>
            <div className={styles["font-size"]}>
              <label><BiFontSize/>Size</label>
              <input type="number"
                     value={toolOptions.fontSize}
                     onInput={(e)=>dispatchToolOptions(
                       {type: "fontSize", value: Number(e.target.value)}
                     )}/>
            </div>
            <div className={styles["button-checkbox"] + " button-checkbox"}>
              <label>
                <BiBold/>
                <input type="checkbox"
                       checked={toolOptions.bold}
                       onChange={(e)=>dispatchToolOptions({type: "bold", value: e.target.checked})}/>
              </label>
            </div>
            <div className={styles["button-checkbox"] + " button-checkbox"}>
              <label><BiItalic/>
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
