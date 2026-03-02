export function clearCanvas(ctx){
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);    
}

export function drawTool(activeTool, ctx, options){
    switch(activeTool){
    case "rectangle":
        drawRectangle(ctx, options);
        break;
    case"circle":
        if(options.arcSubtool==="circle")
          drawCircle(ctx, options);
        else
          drawArc(ctx, options);
        break;
    case "line":
        drawLine(ctx, options);
        break;
    case "pen":
        drawPen(ctx, options);
        break;
    case "eraser":
        erase(ctx, options);
        break;
    case "text":
        writeText(ctx, options);
        break;
    case null: break;
    default:
        console.warn("Unknown tool: ", activeTool);
    }
    
}

export function drawRectangle(ctx, options){
    if(options.fillStroke=="fill" || options.fillStroke=="both")
        ctx.fillRect(options.x, options.y, options.width, options.height);

    if(options.fillStroke=="stroke" || options.fillStroke=="both") 
        ctx.strokeRect(options.x, options.y, options.width, options.height);
}

export function drawCircle(ctx, options){
    ctx.beginPath();
    ctx.arc(options.x, options.y, options.radius , 0 ,Math.PI*2, true);

    if(options.fillStroke=="fill" || options.fillStroke=="both")
        ctx.fill();
    if(options.fillStroke=="stroke" || options.fillStroke=="both") 
        ctx.stroke();
}

export function drawArc(ctx, options){
    ctx.beginPath();

    // Only sector needs moveTo(center)
    if (options.arcSubtool === "sector") {
        ctx.moveTo(options.x, options.y);
    }

    ctx.arc(options.x, options.y, options.radius,
            options.arcStart*(Math.PI/180)*-1, options.arcEnd*(Math.PI/180)*-1,
            options.arcCC);

    // Arc is always open
    if (options.arcSubtool !== "arc") {
        ctx.closePath();
    }

    if(options.arcSubtool !== "arc" &&
       (options.fillStroke=="fill" ||
        options.fillStroke=="both") )
        ctx.fill();

    if(options.arcSubtool === "arc" ||
       options.fillStroke=="stroke" ||
       options.fillStroke=="both" ) 
        ctx.stroke();
    
}

export function drawLine(ctx, options){
    ctx.beginPath();
    ctx.moveTo(options.x, options.y);
    ctx.lineTo(options.endX, options.endY);
    ctx.stroke();
}

export function drawPen(ctx, options){
    const backupStyle = ctx.fillStyle;
    ctx.fillStyle = ctx.strokeStyle;
    if(options.shape=="square"){
        ctx.fillRect(options.x, options.y, options.size, options.size);
    }else{
        ctx.beginPath();
        ctx.arc(options.x, options.y, options.size/2 , 0 ,Math.PI*2, true);
        ctx.fill();        
    }
    ctx.fillStyle= backupStyle;
}

export function erase(ctx, options){
    ctx.clearRect(options.x, options.y, options.size, options.size);
}

export function writeText(ctx, options){
    ctx.font= `${options.italics?"italic":"normal"} ${options.bold?"bold":"normal"} ${options.fontSize || "10"}px "${options.font}" `;
    ctx.textAlign = options.halign;
    ctx.textBaseline = options.valign;
    
    if(options.fillStroke=="fill" || options.fillStroke=="both")
        ctx.fillText(options.text, options.x, options.y);

    if(options.fillStroke=="stroke" || options.fillStroke=="both") 
        ctx.strokeText(options.text, options.x, options.y);
}
