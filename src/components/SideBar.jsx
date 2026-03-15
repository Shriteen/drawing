import MetaControls from '_components/sidebar/MetaControls';
import SpaceTimeControls from '_components/sidebar/SpaceTimeControls';
import ToolBar from '_components/sidebar/ToolBar';
import styles from './SideBar.module.css';

export default function SideBar() {  
  return (
    <div className={styles.sidebar}>
      <MetaControls/>
      <ToolBar/>
      <SpaceTimeControls/>
    </div>
  );
}
