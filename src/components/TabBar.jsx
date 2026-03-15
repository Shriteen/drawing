import useTabs from '_hooks/useTabs';

export default function TabBar() {
  const {tabs, newTab, closeTab, activeTabId, setActiveTabId } = useTabs();
    
  const tabElements= tabs.map(tab=>(
    <div key={tab.id}
         className={"tab"+ (tab.id==activeTabId?" active":"")}
         onClick={e=>setActiveTabId(tab.id)}
    >
      <span className="tab-title">{tab.title}</span>
      <button className="tab-close" onClick={e=> {closeTab(tab.id); e.stopPropagation()}}>X</button>
    </div>
  ));
  
  return (
    <div className="tabbar">
      {tabElements}
      <button className="new-tab-button" onClick={newTab} disabled={tabs.length>12}>+</button>
    </div>
  );
}
