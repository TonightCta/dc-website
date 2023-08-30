import { ReactElement, ReactNode, createContext, useReducer } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import { defaultContext, defaultState, defaultStateInit, initState } from './reducer';
import RouteConfig from './route';
import { Context } from './utils/types';
import './style/index.scss'

export const VoiceAdmin = createContext<Context>(defaultContext);

const App = (): ReactElement<ReactNode> => {
  const [state, dispatch] = useReducer(initState, defaultState, defaultStateInit);
  return (
    <HashRouter>
      <div className="App">
        <VoiceAdmin.Provider value={{ state, dispatch }}>
          <RouteConfig />
        </VoiceAdmin.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
