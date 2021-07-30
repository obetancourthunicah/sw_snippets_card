import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {SessionProvider, useSession} from './hooks/Session';
import mainReducer from "./store/";

import PrivateRoute from './components/shared/PrivateRoute';
import Menu from './components/shared/Menu/';
/* Public Pages */

import SplashScreen from './components/public/SplashScreen/';
import Home from './components/public/Home';
import LoginPage from './components/public/Login/';
import SiginPage from './components/public/Signin/';
/* Private Pages */
import MySnippetsPage from './components/private/MySnippets';
import MySnippetPage from './components/private/MySnippet';
import AddSnippetPage from './components/private/AddSnippet';

import './App.css';

function App() {
  let appSession = mainReducer();
  return (
    <SessionProvider initialState={appSession} reducer={mainReducer}>
    <SplashScreen>
        <Router>
          <div className="App">
              <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/login" component={LoginPage}></Route>
                  <Route exact path="/sigin" component={SiginPage}></Route>

                  <PrivateRoute exact path="/mysnippets" component={MySnippetsPage}></PrivateRoute>
                  <PrivateRoute exact path="/mysnippet" component={MySnippetPage}></PrivateRoute>
                  <PrivateRoute exact path="/addsnippet" component={AddSnippetPage}></PrivateRoute>
                  
              </Switch>
              <Menu login={false}></Menu>
          </div>
        </Router>
      </SplashScreen>
    </SessionProvider>
  );
}

export default App;
