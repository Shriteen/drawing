import { BiX, BiPlus } from "react-icons/bi";
import useTabs from '_hooks/useTabs';
import styles from './TabBar.module.css';


export default function TabBar() {
  const {tabs, newTab, closeTab, activeTabId, setActiveTabId } = useTabs();
  
  const tabElements= tabs.map(tab=>(
    <div key={tab.id}
         className={styles.tab+ (tab.id==activeTabId?(" "+styles.active):"")}
         onClick={e=>setActiveTabId(tab.id)}
    >
      <span className={styles["tab-title"]}>{tab.title}</span>
      <button className={styles["tab-close"]}
              onClick={e=> {closeTab(tab.id); e.stopPropagation()}}
              title="Close"> <BiX/> </button>
    </div>
  ));
  
  return (
    <div className={styles.tabbar}>
      {tabElements}
      <button className={styles["new-tab-button"]}
              onClick={newTab}
              disabled={tabs.length>12}
              title="New Tab"><BiPlus/></button>
    </div>
  );
}
