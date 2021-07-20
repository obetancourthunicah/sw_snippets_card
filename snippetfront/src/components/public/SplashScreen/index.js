//JSX
import "./splashscreen.css";
import { useSession } from "../../../hooks/Session";
import { useEffect } from "react";

const SplashScreen = () => {
  const [ {app}, dispatch ] = useSession();
  console.log(app);
  useEffect(()=>{
    setTimeout(()=>{
      dispatch({ type:"APP_MIN"});
    }, 10000)
  },[])
  return (
    <section className="SplashScreen">
      <div>
        <h1>Snippets Market V1</h1>
        <h2>Initialized: {app.initialized && "OK"}</h2>
        <h2>Time Elapsed: {app.minTimeElapsed && "OK" } </h2>
      </div>
    </section>
  );
}


/*
import {Component} from 'react';

class SplashScreen extends Component{

  render(){
    return (
      <section className="SplashScreen">
        <h1>Snippets Market V1</h1>
      </section>
    );
  }
}
*/
/*

  var section =  document.createElement("section");
  section.addChild(document.createElement("h1").innerHTML="Snippets Market V1");
  document.addChild(section);
 */
export default SplashScreen;
