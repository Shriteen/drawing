import { clearCanvas } from '_services/draw';
import BasePreview from './BasePreview';

export default class EraserPreview extends BasePreview {

    static reset(pctx, ctx){
	pctx.drawImage(ctx.canvas,0,0);
	super.reset();
    }

    static clear(ctx){ }

    
    static handleFrame(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions){
	super.handleFrame();

	const updates= BasePreview.onDraw(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions);
	return updates;
    }

    static commit(pctx, ctx){
	clearCanvas(ctx);
	ctx.drawImage(pctx.canvas,0,0);
    }
}
