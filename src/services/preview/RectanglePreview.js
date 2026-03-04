import BasePreview from "./BasePreview";

export default class RectanglePreview extends BasePreview{
    
    static handleFrame(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions){
	super.handleFrame();
	
	const rect = canvas.getBoundingClientRect();
	const scale = {x: (canvas.width / rect.width), y: (canvas.height / rect.height) }
	const updates = {
	    w: (mouseX - rect.left)*scale.x - toolDynamicOptions.x,
	    h: (mouseY - rect.top)*scale.y - toolDynamicOptions.y
	};
	dispatchToolDynamicOptions({type: "wh", ...updates });

	return updates;
    }

    static setColorStartPos(mouseX,mouseY,canvas,{fillStyle, setFillStyle}){
	const rect = canvas.getBoundingClientRect();
	const scale = {x: (canvas.width / rect.width), y: (canvas.height / rect.height) }
	
	if(fillStyle.mode==="linear-gradient"){
	    setFillStyle({
		...fillStyle,
		sourcePoint: {
		    ...fillStyle.sourcePoint,
		    x: (mouseX - rect.left)*scale.x,
		    y: (mouseY - rect.top)*scale.y
		}
	    });
	}else if(fillStyle.mode==="radial-gradient"){
	    setFillStyle({
		...fillStyle,
		sourcePoint: {
		    ...fillStyle.sourcePoint,
		    x: (mouseX - rect.left)*scale.x,
		    y: (mouseY - rect.top)*scale.y
		},
		targetPoint: {
		    ...fillStyle.targetPoint,
		    x: (mouseX - rect.left)*scale.x,
		    y: (mouseY - rect.top)*scale.y
		}
	    });
	}
    }

    static setColorEndPos(mouseX,mouseY,canvas,{fillStyle, setFillStyle}){
	const rect = canvas.getBoundingClientRect();
	const scale = {x: (canvas.width / rect.width), y: (canvas.height / rect.height) }
	if(fillStyle.mode==="linear-gradient"){
	    setFillStyle({
		...fillStyle,
		targetPoint: {
		    ...fillStyle.targetPoint,
		    x: (mouseX - rect.left)*scale.x,
		    y: (mouseY - rect.top)*scale.y
		}
	    });
	}else if(fillStyle.mode==="radial-gradient"){
	    const x1=fillStyle.sourcePoint.x, y1=fillStyle.sourcePoint.y;
	    const x2=(mouseX - rect.left)*scale.x,  y2= (mouseY - rect.top)*scale.y;
	    const dist = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
	    
	    setFillStyle({
		...fillStyle,
		sourcePoint: {
		    ...fillStyle.sourcePoint,
		    r: dist/3
		},
		targetPoint: {
		    ...fillStyle.targetPoint,
		    r: dist
		}
	    });
	}
    }
}
