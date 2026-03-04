import { MetadataContextProvider } from '_contexts/MetadataContext';
import { CanvasContextProvider, PreviewCanvasContextProvider, DrawingContextProvider, ZoomContextProvider } from '_contexts/CanvasContext';
import { FillStyleContextProvider,StrokeStyleContextProvider,LineContextProvider } from '_contexts/StylingContexts';
import { ActiveToolContextProvider, ToolDynamicOptionsContextProvider ,ToolOptionsContextProvider } from '_contexts/ToolContexts';
import SideBar from '_components/SideBar';
import StatusBar from '_components/StatusBar';
import ViewPort from '_components/ViewPort';


export default function Workspace() {
  return (
    <MetadataContextProvider initialTitle="Untitled">
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
                          <div className='workspace'>
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
    </MetadataContextProvider>
  );
}
