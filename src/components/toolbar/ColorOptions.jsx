import { useState, useContext, useEffect } from "react";
import styles from './ToolBar.module.css';

function numToHex(number, minWidth=2){
  return Number(number).toString(16).padStart(minWidth, '0').toUpperCase();
}

function decomposeHexColor(hex){
  return {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16)
  };
}
export default function ColorOptions({
  mode="solid",
  initialPrimaryColor={r:255,g:0,b:255,a:1},
  initialSecondaryColor={r:255,g:255,b:255,a:1},
  initialSource={x:0,y:0, r:200},
  initialTarget={x:100,y:100, r:10},
  onSelect
}) {
  
  const [primaryR, setPrimaryR] =useState(initialPrimaryColor.r);
  const [primaryG, setPrimaryG] =useState(initialPrimaryColor.g);
  const [primaryB, setPrimaryB] =useState(initialPrimaryColor.b);
  const [primaryA, setPrimaryA] =useState(initialPrimaryColor.a);
  const [secondaryR, setSecondaryR] =useState(initialSecondaryColor.r);
  const [secondaryG, setSecondaryG] =useState(initialSecondaryColor.g);
  const [secondaryB, setSecondaryB] =useState(initialSecondaryColor.b);
  const [secondaryA, setSecondaryA] =useState(initialSecondaryColor.a);
  const [sourceX, setSourceX] =useState(initialSource.x);
  const [sourceY, setSourceY] =useState(initialSource.y);
  const [sourceRad, setSourceRad] =useState(initialSource.r);
  const [targetX, setTargetX] =useState(initialTarget.x);
  const [targetY, setTargetY] =useState(initialTarget.y);
  const [targetRad, setTargetRad] =useState(initialTarget.r);

  useEffect(()=>{
    setSourceX(initialSource.x);
    setSourceY(initialSource.y);
    setSourceRad(initialSource.r);
    setTargetX(initialTarget.x);
    setTargetY(initialTarget.y);
    setTargetRad(initialTarget.r);
  }, [initialSource, initialTarget]);
    
  
  const primaryColor="#"+numToHex(primaryR)+numToHex(primaryG)+numToHex(primaryB);
  const secondaryColor="#"+numToHex(secondaryR)+numToHex(secondaryG)+numToHex(secondaryB);
  
  function setPrimaryColor(hexColor){
    const {r,g,b}=decomposeHexColor(hexColor);
    setPrimaryR(r);
    setPrimaryG(g);
    setPrimaryB(b);
  }

  function setSecondaryColor(hexColor){
    const {r,g,b}=decomposeHexColor(hexColor);
    setSecondaryR(r);
    setSecondaryG(g);
    setSecondaryB(b);
  }

  
  
  return (
    <div className={styles["color-options"]}>
      <div className="color-1">
        <div className="color-input-element">
          <label>{(mode==="solid")?"Select Color":"Start Color"}</label>
          <input type="color"
                 value={ primaryColor }
                 onChange={(e)=>setPrimaryColor(e.target.value)}/>
        </div>
        <div className={styles["rgba-input"]}>
          <input type="number" min="0" max="255"
                 value={ primaryR }
                 onChange={(e)=>setPrimaryR(Math.min(Math.max(e.target.value, 0), 255))}/>
          <input type="number" min="0" max="255"
                 value={ primaryG }
                 onChange={(e)=>setPrimaryG(Math.min(Math.max(e.target.value, 0), 255))}/>
          <input type="number" min="0" max="255"
                 value={ primaryB }
                 onChange={(e)=>setPrimaryB(Math.min(Math.max(e.target.value, 0), 255))}/>
          <input type="number" min="0" max="1" step="0.01"
                 value={ primaryA }
                 onChange={(e)=>setPrimaryA(Math.min(Math.max(e.target.value, 0), 1))}/>
        </div>
      </div>
      {
        (mode==="linear-gradient" || mode==="radial-gradient") && (
          <>
            <div className="color-2">
              <div className="color-input-element">
                <label>End Color</label>
                <input type="color"
                       value={ secondaryColor }
                       onChange={(e)=>setSecondaryColor(e.target.value)}/>
              </div>
              <div className={styles["rgba-input"]}>
                <input type="number" min="0" max="255"
                       value={ secondaryR }
                       onChange={(e)=>setSecondaryR(Math.min(Math.max(e.target.value, 0), 255))}/>
                <input type="number" min="0" max="255"
                       value={ secondaryG }
                       onChange={(e)=>setSecondaryG(Math.min(Math.max(e.target.value, 0), 255))}/>
                <input type="number" min="0" max="255"
                       value={ secondaryB }
                       onChange={(e)=>setSecondaryB(Math.min(Math.max(e.target.value, 0), 255))}/>
                <input type="number" min="0" max="1" step="0.01"
                       value={ secondaryA }
                       onChange={(e)=>setSecondaryA(Math.min(Math.max(e.target.value, 0), 1))}/>
              </div>
            </div>
            <div className={styles["source-point"]}>
              <div>
                <label>Start Coordinates</label>
                <input type="number" value={ sourceX }
                       onChange={(e)=>setSourceX(Number(e.target.value))}/>
                <input type="number" value={ sourceY }
                       onChange={(e)=>setSourceY(Number(e.target.value))}/>
              </div>
              {
                (mode==="radial-gradient" &&
                 <div>
                   <label>Start Radius</label>
                   <input type="number" value={ sourceRad }
                          onChange={(e)=>setSourceRad(Number(e.target.value))}/>
                 </div>
                )
              }
            </div>
            <div className={styles["target-point"]}>
              <div>              
                <label>End Coordinates</label>
                <input type="number" value={ targetX }
                       onChange={(e)=>setTargetX(Number(e.target.value))}/>
                <input type="number" value={ targetY }
                       onChange={(e)=>setTargetY(Number(e.target.value))}/>
              </div>
              {
                (mode==="radial-gradient" &&
                 <div>
                   <label>End Radius</label>
                   <input type="number" value={ targetRad }
                          onChange={(e)=>setTargetRad(Number(e.target.value))}/>
                 </div>
                )
              }
            </div>
          </>
        )
      }
      <div>
        {
          (mode==="linear-gradient" || mode==="radial-gradient") && (
            <button onClick={(e)=>{ setPrimaryColor(secondaryColor); setSecondaryColor(primaryColor) }}>Swap</button>
          )
        }
        <button onClick={ (e)=>onSelect(
                  {r:primaryR,g:primaryG,b:primaryB,a:primaryA},
                  {r:secondaryR,g:secondaryG,b:secondaryB,a:secondaryA},
                  {x:sourceX,y:sourceY,r:sourceRad},
                  {x:targetX,y:targetY,r:targetRad}
                )} >Select</button>
      </div>
    </div>
  );
}
