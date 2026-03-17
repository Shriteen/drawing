import ToolPalette from '_components/toolbar/ToolPalette';
import ToolOptions from '_components/toolbar/ToolOptions';
import ToolDynamicOptions from '_components/toolbar/ToolDynamicOptions';
import StyleControls from '_components/toolbar/StyleControls';
import styles from '../SideBar.module.css';

export default function ToolBar() {
  
  return (
    <div className={styles.toolbar}>
      <ToolPalette/>
      <StyleControls/>
      <hr/>
      <ToolOptions/>
      <ToolDynamicOptions/>
    </div>
  );
}
