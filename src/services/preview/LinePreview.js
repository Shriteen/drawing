import BasePreview from "./BasePreview";

export default class LinePreview extends BasePreview{
    
    static handleFrame(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions){
	super.handleFrame();
	
	const rect = canvas.getBoundingClientRect();
	const updates = {endX: mouseX-rect.left , endY: mouseY-rect.top};
	dispatchToolDynamicOptions({type: "end", ...updates });

	return updates;
    }
}
