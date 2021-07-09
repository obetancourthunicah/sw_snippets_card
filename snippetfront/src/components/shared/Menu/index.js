// A todo componente de react se agrega un objeto props
// login
import './menu.css';
const Menu = ( {login} )=>{
  if (!login){
    return (
      <ul className="Menu">
        <li><a href>Login</a></li>
        <li><a href>Signin</a></li>
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
