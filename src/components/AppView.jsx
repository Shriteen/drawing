import { useContext } from 'react';
import TabBar from '_components/TabBar.jsx'
import Workspace from '_components/Workspace.jsx'
import {AppContext} from '_contexts/AppContext.jsx';

export default function AppView() {
  const { appMdState,activeTabId} = useContext(AppContext);
  
  const workspaceItems = appMdState.map(ws=>(<Workspace key={ws.id} id={ws.id} active={activeTabId===ws.id}/>));
  
  return (
    <>
      <TabBar/>
      {workspaceItems}
    </>
  );
}
