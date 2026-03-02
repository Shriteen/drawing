import BasePreview from "./BasePreview";

export default class LinePreview extends BasePreview{

    static clear(ctx){ }

    
    static handleFrame(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions){
	super.handleFrame();

	const updates= BasePreview.onDraw(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions);
	return updates;
    }
}
