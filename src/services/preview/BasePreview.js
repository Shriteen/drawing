import { clearCanvas } from '_services/draw';

export default class BasePreview{

    static reset(pctx, ctx){
	this.clear(pctx);
    }
    
    static clear(ctx){
	clearCanvas(ctx);
    }

    static onDraw(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions){
	const rect = canvas.getBoundingClientRect();
	const scale = {x: (canvas.width / rect.width), y: (canvas.height / rect.height) }
	const updates = {x: (mouseX-rect.left)*scale.x , y: (mouseY-rect.top)*scale.y};
	dispatchToolDynamicOptions({type: "xy", ...updates });

	return updates;
    }
    
    static handleFrame(mouseX,mouseY, canvas, toolDynamicOptions, dispatchToolDynamicOptions){}

    static commit(pctx, ctx){
	ctx.drawImage(pctx.canvas,0,0);
    }

    static setColorStartPos({fillStyle, setFillStyle}){}
    
    static setColorEndPos({fillStyle, setFillStyle}){}
}
