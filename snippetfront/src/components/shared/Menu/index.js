// A todo componente de react se agrega un objeto props
// login
import './menu.css';
import { Link } from 'react-router-dom';
import {useSession} from '../../../hooks/Session';
const Menu = ()=>{
  let [ {sec}, ] = useSession();
  if (!sec.isLogged){
    return (
      <ul className="Menu">
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/sigin'>Signin</Link></li>
      </ul>
    );
  }else {
    return (
      <ul className="Menu">
        <li><Link to="/mysnippets">Snippets</Link></li>
        <li><a >Dashboard</a></li>
        <li><a >Profile</a></li>
        <li><a >Upload</a></li>
      </ul>
    );
  }
  
}

export default Menu;
