import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


import Menu from './components/shared/Menu/';
import SplashScreen from './components/public/SplashScreen/';
import LoginPage from './components/public/Login/';
import SiginPage from './components/public/Signin/';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
              <Route exact path="/">
                <SplashScreen></SplashScreen>
              </Route>
              <Route exact path="/login">
                <LoginPage></LoginPage>
              </Route>
              <Route exact path="/sigin">
                <SiginPage></SiginPage>
              </Route>
          </Switch>
          <Menu login={false}></Menu>
      </div>
    </Router>
  );
}

export default App;
