import { MetadataContextProvider } from '_contexts/MetadataContext';
import { HistoryContextProvider } from '_contexts/HistoryContext';
import { CanvasContextProvider, PreviewCanvasContextProvider, DrawingContextProvider, ZoomContextProvider } from '_contexts/CanvasContext';
import { FillStyleContextProvider,StrokeStyleContextProvider,LineContextProvider } from '_contexts/StylingContexts';
import { ActiveToolContextProvider, ToolDynamicOptionsContextProvider ,ToolOptionsContextProvider } from '_contexts/ToolContexts';
import SideBar from '_components/SideBar';
import StatusBar from '_components/StatusBar';
import ViewPort from '_components/ViewPort';


export default function Workspace({id, active}) {
  return (
    <MetadataContextProvider id={id}>
      <HistoryContextProvider>
        <ActiveToolContextProvider>
          <ToolOptionsContextProvider>
            <ToolDynamicOptionsContextProvider>
              <FillStyleContextProvider>
                <LineContextProvider>
                  <StrokeStyleContextProvider>
                    <ZoomContextProvider>
                      <CanvasContextProvider >
                        <PreviewCanvasContextProvider >
                          <DrawingContextProvider >
                            <div className='workspace' style={active?null:{display:"none"}}>
                              <SideBar/>
                              <ViewPort/>
                              <StatusBar/>
                            </div>
                          </DrawingContextProvider >
                        </PreviewCanvasContextProvider>
                      </CanvasContextProvider>
                    </ZoomContextProvider>
                  </StrokeStyleContextProvider>
                </LineContextProvider>
              </FillStyleContextProvider>
            </ToolDynamicOptionsContextProvider>
          </ToolOptionsContextProvider>
        </ActiveToolContextProvider>
      </HistoryContextProvider>
    </MetadataContextProvider>
  );
}
