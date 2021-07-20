const emptyApp = {
  initialized :false,
  minTimeElapsed: false
}

export const APP_INIT = "APP_INIT";
export const APP_MIN = "APP_MIN";

const appReducer = (state=emptyApp, action={})=>{
  switch(action.type){
    case APP_INIT:
      return { ...state, initialized:true}
    case APP_MIN:
      return {...state, minTimeElapsed:true}
    default:
      return state;
  }
}
export default appReducer;
