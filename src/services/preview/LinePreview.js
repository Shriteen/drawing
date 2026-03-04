import BasePreview from "./BasePreview";

export default class LinePreview extends BasePreview{
    
    static handleFrame(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions){
	super.handleFrame();
	
	const rect = canvas.getBoundingClientRect();
	const scale = {x: (canvas.width / rect.width), y: (canvas.height / rect.height) }
	const updates = {endX: (mouseX-rect.left)*scale.x , endY: (mouseY-rect.top)*scale.y };
	dispatchToolDynamicOptions({type: "end", ...updates });

	return updates;
    }
}
