import {createContext, useContext, useReducer} from 'react';

let sessionIsConfigured = false;

export const Session = createContext();

//High order Component
export const SessionProvider = ({reducer, initialState, children})=>{
  const reducerValue = useReducer(reducer, initialState);
  if (!sessionIsConfigured) {
    sessionIsConfigured = true;
  }
  return (
    <Session.Provider value={reducerValue}>
      {children}
    </Session.Provider>
  )
}

//Hook para acceder al Session
export const useSession = () => useContext(Session);
