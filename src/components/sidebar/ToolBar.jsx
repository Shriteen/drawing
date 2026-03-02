import ToolPalette from '_components/toolbar/ToolPalette';
import ToolOptions from '_components/toolbar/ToolOptions';
import ToolDynamicOptions from '_components/toolbar/ToolDynamicOptions';
import StyleControls from '_components/toolbar/StyleControls';


export default function ToolBar() {
  
  return (
    <div className="toolbar">
      <ToolPalette/>
      <StyleControls/>
      <ToolOptions/>
      <ToolDynamicOptions/>
    </div>
  );
}
