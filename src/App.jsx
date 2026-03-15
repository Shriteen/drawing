import './App.css';
import AppView from '_components/AppView'; 
import { AppContextProvider } from '_contexts/AppContext';

export function App() {
  return (
    <AppContextProvider>
      <AppView/>
    </AppContextProvider>
  );
}
