export default function getNewTabName(tabs){
    if(!tabs || tabs.length==0)
	return 'Untitled';

    const regex= /^Untitled\b(\((\d+)\))*$/;
    const results=tabs.map(tab=> regex.exec(tab.title))
	              .filter(match=>match!=null)
	              .map(match=>Number(match[2]) || 0);

    if(results.length==0)
	return 'Untitled';
    
    const next= Math.max(...results) + 1;
    return `Untitled(${next})`;
}
