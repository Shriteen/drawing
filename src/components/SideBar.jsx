import MetaControls from '_components/sidebar/MetaControls';
import SpaceTimeControls from '_components/sidebar/SpaceTimeControls';
import ToolBar from '_components/sidebar/ToolBar';

export default function SideBar() {  
  return (
    <div className="sidebar">
      <MetaControls/>
      <ToolBar/>
      <SpaceTimeControls/>
    </div>
  );
}
