import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {SessionProvider} from './hooks/Session';
import mainReducer from "./store/";

import PrivateRoute from './components/shared/PrivateRoute';
import Menu from './components/shared/Menu/';
/* Public Pages */
import SplashScreen from './components/public/SplashScreen/';
import LoginPage from './components/public/Login/';
import SiginPage from './components/public/Signin/';
/* Private Pages */
import MySnippetsPage from './components/private/MySnippets';

import './App.css';

function App() {
  let appSession = mainReducer();
  return (
    <SessionProvider initialState={appSession} reducer={mainReducer}>
      <Router>
        <div className="App">
            <Switch>
                <Route exact path="/" component={SplashScreen}></Route>
                <Route exact path="/login" component={LoginPage}></Route>
                <Route exact path="/sigin" component={SiginPage}></Route>

                <PrivateRoute exact path="/mysnippets" component={MySnippetsPage}></PrivateRoute>
            </Switch>
            <Menu login={false}></Menu>
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;
