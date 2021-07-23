import appReducer from './reducers/app';
import secReducer from './reducers/sec';
import snippetReducer from './reducers/snippets';

 const mainReducer = (state= {}, action={})=>{
   const { app, sec, snippet } = state;
  return {
    //list all reducers of app
    sec: secReducer(sec, action),
    app: appReducer(app, action),
    snippet: snippetReducer(snippet, action),
  }
}

export default mainReducer;
