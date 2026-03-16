import { useContext } from "react";
import { ActiveToolContext } from "_contexts/ToolContexts";
import { DrawingContext } from '_contexts/CanvasContext';
import ButtonSet from "_components/utility/ButtonSet";
import { TOOLS } from '_constants/constants';
import styles from './ToolBar.module.css';

export default function ToolPalette() {
  const {activeTool, setActiveTool} = useContext(ActiveToolContext);
  const { setDrawingState } = useContext(DrawingContext);  
  
  const tools= Object.keys(TOOLS).map(key=> {return {id: key, label: TOOLS[key].name} });

  function handleSelect(i){
    if(tools[i].id == activeTool)
      setActiveTool(null);
    else
      setActiveTool(tools[i].id);

    setDrawingState("synced")
  }
  
  return (
    <div className={styles["tool-palette"]}>
      <ButtonSet buttons={tools}
                 selectedIndex={tools.findIndex((tool)=>tool.id===activeTool)}
                 onSelect={handleSelect}/>
    </div>
  );
}
