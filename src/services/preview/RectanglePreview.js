import BasePreview from "./BasePreview";

export default class RectanglePreview extends BasePreview{
    
    static handleFrame(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions){
	super.handleFrame();
	
	const rect = canvas.getBoundingClientRect();
	const updates = {
	    w: (mouseX - rect.left) - toolDynamicOptions.x,
	    h: (mouseY - rect.top) - toolDynamicOptions.y
	};
	dispatchToolDynamicOptions({type: "wh", ...updates });

	return updates;
    }

    static setColorStartPos(mouseX,mouseY,canvas,{fillStyle, setFillStyle}){
	const rect = canvas.getBoundingClientRect();
	if(fillStyle.mode==="linear-gradient"){
	    setFillStyle({
		...fillStyle,
		sourcePoint: {
		    ...fillStyle.sourcePoint,
		    x: mouseX - rect.left,
		    y: mouseY - rect.top
		}
	    });
	}else if(fillStyle.mode==="radial-gradient"){
	    setFillStyle({
		...fillStyle,
		sourcePoint: {
		    ...fillStyle.sourcePoint,
		    x: mouseX - rect.left,
		    y: mouseY - rect.top
		},
		targetPoint: {
		    ...fillStyle.targetPoint,
		    x: mouseX - rect.left,
		    y: mouseY - rect.top
		}
	    });
	}
    }

    static setColorEndPos(mouseX,mouseY,canvas,{fillStyle, setFillStyle}){
	const rect = canvas.getBoundingClientRect();
	if(fillStyle.mode==="linear-gradient"){
	    setFillStyle({
		...fillStyle,
		targetPoint: {
		    ...fillStyle.targetPoint,
		    x: mouseX - rect.left,
		    y: mouseY - rect.top
		}
	    });
	}else if(fillStyle.mode==="radial-gradient"){
	    const x1=fillStyle.sourcePoint.x, y1=fillStyle.sourcePoint.y;
	    const x2=mouseX - rect.left,y2= mouseY - rect.top;
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
