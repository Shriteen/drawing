import { useEffect } from "react";
import { LINE_STYLE_PATTERNS } from "_constants/constants";

export default function useStrokeStyle(ctx, strokeStyle, lineStyle){
    useEffect(() => {
	if(!ctx) return;

	ctx.lineWidth= lineStyle.width;
	const scaledStylePattern = LINE_STYLE_PATTERNS[lineStyle.style].pattern.map(x=>x*lineStyle.width);
	ctx.setLineDash(scaledStylePattern);
	
	switch(strokeStyle.mode){
	case "solid":
	    ctx.strokeStyle = `rgb(${strokeStyle.primaryColor.r} ${strokeStyle.primaryColor.g} ${strokeStyle.primaryColor.b} / ${strokeStyle.primaryColor.a} )`;
	    break;
	case "linear-gradient":
	    const linearGradient = ctx.createLinearGradient(strokeStyle.sourcePoint.x, strokeStyle.sourcePoint.y,
							    strokeStyle.targetPoint.x, strokeStyle.targetPoint.y);
	    linearGradient.addColorStop(
		0,`rgb(${strokeStyle.primaryColor.r} ${strokeStyle.primaryColor.g} ${strokeStyle.primaryColor.b} / ${strokeStyle.primaryColor.a} )` );
	    linearGradient.addColorStop(
		1, `rgb(${strokeStyle.secondaryColor.r} ${strokeStyle.secondaryColor.g} ${strokeStyle.secondaryColor.b} / ${strokeStyle.secondaryColor.a} )`);
	    ctx.strokeStyle= linearGradient;
	    break;
	case "radial-gradient":
	    const radialGradient = ctx.createRadialGradient(strokeStyle.sourcePoint.x, strokeStyle.sourcePoint.y, strokeStyle.sourcePoint.r,
							    strokeStyle.targetPoint.x, strokeStyle.targetPoint.y, strokeStyle.targetPoint.r);
	    radialGradient.addColorStop(
		0,`rgb(${strokeStyle.primaryColor.r} ${strokeStyle.primaryColor.g} ${strokeStyle.primaryColor.b} / ${strokeStyle.primaryColor.a} )` );
	    radialGradient.addColorStop(
		1, `rgb(${strokeStyle.secondaryColor.r} ${strokeStyle.secondaryColor.g} ${strokeStyle.secondaryColor.b} / ${strokeStyle.secondaryColor.a} )`);
	    ctx.strokeStyle= radialGradient;
	    break;
	}
	
    }, [strokeStyle, lineStyle]);
}
