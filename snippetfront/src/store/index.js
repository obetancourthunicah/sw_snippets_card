import appReducer from './reducers/app';
import secReducer from './reducers/sec';

 const mainReducer = (state= {}, action={})=>{
  const { app, sec } = state;
  return {
    //list all reducers of app
    app: appReducer(app, action),
    sec: secReducer(sec, action),
  }
}

export default mainReducer;
