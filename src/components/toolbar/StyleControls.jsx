import { useState, useContext, useEffect } from "react";
import ButtonSet from "_components/utility/ButtonSet";
import ColorOptions from "_components/toolbar/ColorOptions";
import { FillStyleContext, StrokeStyleContext, LineContext } from '_contexts/StylingContexts';
import { PreviewCanvasContext } from "_contexts/CanvasContext";
import useFillStyle from '_hooks/useFillStyle';
import useStrokeStyle from '_hooks/useStrokeStyle';
import { COLOR_STYLE_MODES, LINE_STYLE_PATTERNS } from "_constants/constants";
import styles from './StyleControls.module.css';

const colorStyles= COLOR_STYLE_MODES.map(x=>{return {...x, label: x.mode}});

function getActiveColorStyleIndex(mode){
  return colorStyles.findIndex(style=>style.mode===mode);
}

export default function StyleControls() {
  const {colorStyle:fillStyle, setColorStyle: setFillStyle}= useContext(FillStyleContext);
  const {colorStyle:strokeStyle, setColorStyle: setStrokeStyle}= useContext(StrokeStyleContext);
  const {lineState, setLineState}= useContext(LineContext);

  const [editStyleOf, setEditStyleOf] = useState(null);
  
  const selectedFillIndex=getActiveColorStyleIndex(fillStyle?.mode);
  const selectedStrokeIndex=getActiveColorStyleIndex(strokeStyle?.mode);

  const lineOptionElements= Object.keys(LINE_STYLE_PATTERNS).map(key=>(<option key={key} value={key}>{LINE_STYLE_PATTERNS[key].name}</option>));

  const canvasRef= useContext(PreviewCanvasContext);

  useFillStyle(canvasRef.current?.getContext?.("2d"), fillStyle);
  useStrokeStyle(canvasRef.current?.getContext?.("2d"), strokeStyle, lineState);
  
  function setSelectedFillMethod(i){
    setFillStyle({...fillStyle, mode: colorStyles[i].mode});
  }

  function setSelectedStrokeMethod(i){
    setStrokeStyle({...strokeStyle, mode: colorStyles[i].mode});
  }

  function setFillColorStyle(primaryColor,secondaryColor,sourcePoint,targetPoint) {
    setFillStyle({...fillStyle, primaryColor, secondaryColor, sourcePoint, targetPoint});
    setEditStyleOf(null);
  }

  function setStrokeColorStyle(primaryColor,secondaryColor,sourcePoint,targetPoint) {
    setStrokeStyle({...strokeStyle, primaryColor, secondaryColor, sourcePoint, targetPoint});
    setEditStyleOf(null);
  }

  
  return (
      <div className={styles["style-controls"]}>
        <div className={styles.fillStyleContainer}>
        <label>Fill Styles</label>    
        <ButtonSet key="fillStyle"
                   buttons={colorStyles}
                   selectedIndex={selectedFillIndex}
                   onSelect={(i)=>{setSelectedFillMethod(i); setEditStyleOf("fill"); }}/>
          {(editStyleOf=="fill") &&
           <ColorOptions mode={fillStyle.mode}
                         initialPrimaryColor={fillStyle.primaryColor}
                         initialSecondaryColor={fillStyle.secondaryColor}
                         initialSource={fillStyle.sourcePoint}
                         initialTarget={fillStyle.targetPoint}
                         onSelect={setFillColorStyle} />
          }
      </div>
        <div className={styles.strokeStyleContainer}>
          <label>Stroke Styles</label>
          <ButtonSet key="strokeStyle"
                     buttons={colorStyles}
                     selectedIndex={selectedStrokeIndex}
                     onSelect={(i)=>{setSelectedStrokeMethod(i); setEditStyleOf("stroke"); }}/>
          {(editStyleOf=="stroke") &&
           <ColorOptions mode={strokeStyle.mode}
                         initialPrimaryColor={strokeStyle.primaryColor}
                         initialSecondaryColor={strokeStyle.secondaryColor}
                         initialSource={strokeStyle.sourcePoint}
                         initialTarget={strokeStyle.targetPoint}
                         onSelect={setStrokeColorStyle}/>
          }
        <div className={styles["lineStyleContainer"]}>
          <label>Width</label>  
          <input type="number" min="1" max="50"
                 value={lineState.width}
                 onChange={(e)=>setLineState({...lineState, width: Math.min(Math.max(e.target.value, 1), 50)})} />
          <label>Style</label>
          <select value={lineState.style}
                  onChange={(e)=>setLineState({...lineState, style: e.target.value })}>
            {lineOptionElements}
          </select>
        </div>
      </div>
    </div>
  );
}
