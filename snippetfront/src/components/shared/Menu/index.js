// A todo componente de react se agrega un objeto props
// login
import './menu.css';
import { Link } from 'react-router-dom';
const Menu = ( {login} )=>{
  if (!login){
    return (
      <ul className="Menu">
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/sigin'>Signin</Link></li>
      </ul>
    );
  }else {
    return (
      <ul className="Menu">
        <li><a href>Snippets</a></li>
        <li><a href>Dashboard</a></li>
        <li><a href>Profile</a></li>
        <li><a href>Upload</a></li>
      </ul>
    );
  }
  
}

export default Menu;
