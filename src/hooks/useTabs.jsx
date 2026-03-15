import { useContext } from "react";
import { AppContext } from "_contexts/AppContext";
import numberGenerator from "_services/numberGenerator";

export default function useTabs(){
    const { appMdState, setAppMdState,activeTabId,setActiveTabId} = useContext(AppContext);
    
    const tabs= appMdState.map(tab=>{ return {id: tab.id, title: tab.title}; });

    function newTab(){
	const newId= numberGenerator.next().value;
	setAppMdState([...appMdState, {id: newId, title: 'Untitled'} ]);
	setActiveTabId(newId);
    }

    function closeTab(closedId){
	const tabsAfter = appMdState.filter(tab=>tab.id !== closedId);

	//If last tab is closed
	if(tabsAfter.length==0)
	    tabsAfter.push({id: numberGenerator.next().value, title: 'Untitled'});

	//If current tab is closed
	if(closedId===activeTabId)
	    setActiveTabId(tabsAfter[0].id);
	
	setAppMdState(tabsAfter);
    }
    
    return {tabs, newTab, closeTab, activeTabId, setActiveTabId};
}
