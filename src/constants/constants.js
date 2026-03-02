export const COLOR_STYLE_MODES = [
  {mode: "solid"},
  {mode: "linear-gradient"},
  {mode: "radial-gradient"}
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
    "rectangle" : { name: "Rectangle" },
    "circle" : { name: "Circle" },
    "line" : { name: "Line" },
    "pen" : { name: "Pen" },
    "eraser" : { name: "Eraser" },
    "text" : { name: "Text" }
} 

export const ARC_SUBTOOLS = {
    "circle" : {name: "Circle"},
    "arc" : {name: "Arc"},
    "segment" : {name: "Segment"},
    "sector" : {name: "Sector"}
}
