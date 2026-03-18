export const COLOR_STYLE_MODES = [
    {mode: "solid", reactIcon: "BiSolidCircle"},
    {mode: "linear-gradient", reactIcon: "BiAdjust"},
    {mode: "radial-gradient", reactIcon: "BiBullseye"}
];

export const LINE_STYLE_PATTERNS = {
    "continous": {name: "Continuous" , pattern: []},
    "denseDots": {name: "Dense Dots" , pattern: [1,1]},
    "dots":{name: "Dots" , pattern: [1,2]},
    "sparseDots":{name: "Sparse Dots" , pattern: [1,5]},
    "dashes": {name: "Dashes" , pattern: [10,5]},
    "shortDashes": {name: "Short Dashes" , pattern: [5,5]},
    "longDashes": {name: "Long Dashes" , pattern: [15,10]},
    "dashDots": {name: "Dash Dots" , pattern: [5,2,1,2]},
}

export const TOOLS = {
    "rectangle" : { name: "Rectangle" , reactIcon: "BiRectangle"},
    "circle" : { name: "Circle", reactIcon: "BiCircle" },
    "line" : { name: "Line", reactIcon: "BiMinus"},
    "pen" : { name: "Pen", reactIcon: "BiPencil"},
    "eraser" : { name: "Eraser", reactIcon: "BiEraser" },
    "text" : { name: "Text", reactIcon: "BiFont" }
} 

export const ARC_SUBTOOLS = {
    "circle" : {name: "Circle", reactIcon: "BiSolidCircle"},
    "arc" : {name: "Arc", reactIcon: "BiLoaderAlt"},
    "segment" : {name: "Segment", reactIcon: "BiSolidAdjustAlt"},
    "sector" : {name: "Sector", reactIcon: "BiSolidCircleThreeQuarter"}
}

export const TOOL_MESSAGES = {
    null: {
        synced: "Use sidebar to select a tool.",
        drawing: "Use sidebar to select a tool.",
        preview: "Use sidebar to select a tool."
    },
    rectangle: {
        synced: "Click & Drag on canvas to draw!",
        drawing: "",
        preview: "Click & drag again to redraw or use options to adjust. Change styles as you feel. Click Apply when you're done!"
    },
    circle: {
        synced: "Click & Drag on canvas to draw! The click position defines the center.",
        drawing: "Drag to set radius",
        preview: "Click & drag again to redraw. Use options to adjust and change angle, direction, styles and more. Click Apply when you're done!"
    },
    line: {
        synced: "Click & Drag on canvas to draw!",
        drawing: "",
        preview: "Click & drag again to redraw or use options to adjust endpoints and style. Click Apply when you're done!"
    },
    pen: {
        synced: "Click & Drag on canvas to draw! Don't drag too fast though!",
        drawing: "Move slowly for contiguous line or fast for a sparse dots style",
        preview: "Click & drag to add more. But be careful—canceling after the next stroke will discard the current stroke as well. Click Apply to finalize!"
    },
    eraser: {
        synced: "Choose size and Click & Drag to erase!",
        drawing: "",
        preview: "Click & drag to erase more. Click Apply to finalize!"
    },
    text: {
        synced: "Enter the text and click to position!",
        drawing: "",
        preview: "Click to reposition. Use options to adjust text, font, size, styles and more. Click Apply when you're done!"
    }
};
