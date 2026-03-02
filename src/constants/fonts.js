const googleFonts = [
  { name: "Inter", urlPart: "Inter:wght@400;700" },
  { name: "Roboto", urlPart: "Roboto:wght@400;700" },
  { name: "Noto Sans", urlPart: "Noto+Sans:wght@400;700" },
  { name: "Open Sans", urlPart: "Open+Sans:wght@400;700" },
  { name: "Merriweather", urlPart: "Merriweather:wght@400;700" },
  { name: "Source Serif 4", urlPart: "Source+Serif+4:wght@400;700" },
  { name: "JetBrains Mono", urlPart: "JetBrains+Mono:wght@400;700" },
  { name: "Fira Code", urlPart: "Fira+Code:wght@400;700" },
  { name: "Source Code Pro", urlPart: "Source+Code+Pro:wght@400;700" },
  { name: "Manrope", urlPart: "Manrope:wght@400;700" },
  { name: "Public Sans", urlPart: "Public+Sans:wght@400;700" },
  { name: "Caveat", urlPart: "Caveat:wght@400;700" },
  { name: "Pacifico", urlPart: "Pacifico" },
  { name: "Dancing Script", urlPart: "Dancing+Script" }
];


const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `https://fonts.googleapis.com/css2?family=${googleFonts.map(f => f.urlPart).join("&family=")}`;
document.head.appendChild(link);


function preloadFonts(){
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px"; // hide off-screen
    container.style.top = "-9999px";
    document.body.appendChild(container);

    googleFonts.forEach(font => {
	const match = font.urlPart.match(/wght@([\d;]+)/);
	const weights = match ? match[1].split(";") : ["400"];

	weights.forEach(w => {
	    const el = document.createElement("span");
	    el.style.fontFamily = `'${font.name}'`;
	    el.style.fontWeight = w;
	    el.style.fontSize = "16px";
	    el.textContent = "hidden text";
	    container.appendChild(el);
	});
    });

    setTimeout(()=> document.body.removeChild(container) , 1000);
}

preloadFonts();

const systemFonts = [
  { name: "Sans Serif", internal: "sans-serif" },
  { name: "Serif", internal: "serif" },
  { name: "Monospace", internal: "monospace" },
  { name: "Cursive", internal: "cursive" }
];

const fontList = systemFonts.map(sf=>{return {name:sf.name, value: sf.internal}}).concat(
     googleFonts.map(gf=>{return {name: gf.name, value: gf.name}})
);

export default fontList;
