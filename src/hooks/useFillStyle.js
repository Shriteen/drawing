import { useEffect } from "react";

export default function useFillStyle(ctx, fillStyle){
    useEffect(() => {
	if(!ctx) return;
	
	switch(fillStyle.mode){
	case "solid":
	    ctx.fillStyle = `rgb(${fillStyle.primaryColor.r} ${fillStyle.primaryColor.g} ${fillStyle.primaryColor.b} / ${fillStyle.primaryColor.a} )`;
	    break;
	case "linear-gradient":
	    const linearGradient = ctx.createLinearGradient(fillStyle.sourcePoint.x, fillStyle.sourcePoint.y,
							    fillStyle.targetPoint.x, fillStyle.targetPoint.y);
	    linearGradient.addColorStop(
		0,`rgb(${fillStyle.primaryColor.r} ${fillStyle.primaryColor.g} ${fillStyle.primaryColor.b} / ${fillStyle.primaryColor.a} )` );
	    linearGradient.addColorStop(
		1, `rgb(${fillStyle.secondaryColor.r} ${fillStyle.secondaryColor.g} ${fillStyle.secondaryColor.b} / ${fillStyle.secondaryColor.a} )`);
	    ctx.fillStyle= linearGradient;
	    break;
	case "radial-gradient":
	    const radialGradient = ctx.createRadialGradient(fillStyle.sourcePoint.x, fillStyle.sourcePoint.y, fillStyle.sourcePoint.r,
							    fillStyle.targetPoint.x, fillStyle.targetPoint.y, fillStyle.targetPoint.r);
	    radialGradient.addColorStop(
		0,`rgb(${fillStyle.primaryColor.r} ${fillStyle.primaryColor.g} ${fillStyle.primaryColor.b} / ${fillStyle.primaryColor.a} )` );
	    radialGradient.addColorStop(
		1, `rgb(${fillStyle.secondaryColor.r} ${fillStyle.secondaryColor.g} ${fillStyle.secondaryColor.b} / ${fillStyle.secondaryColor.a} )`);
	    ctx.fillStyle= radialGradient;
	    break;
	}
	
    }, [fillStyle]);
}
