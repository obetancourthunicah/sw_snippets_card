import Menu from './components/shared/Menu/';
import SplashScreen from './components/public/SplashScreen/';
import './App.css';

function App() {
  return (
    <div className="App">
        <SplashScreen></SplashScreen>
        <Menu login={true}></Menu>
    </div>
  );
}

export default App;
