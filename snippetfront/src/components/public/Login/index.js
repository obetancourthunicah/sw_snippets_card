import DataField from  '../../shared/DataField/DataField';
import Button from '../../shared/Buttons/Button';
import Page from '../../shared/Page/Page';
import {useSession} from '../../../hooks/Session';
import {useState} from 'react';
import {SEC_LOGIN, SEC_FETCHING} from '../../../store/reducers/sec';
import { publicaxios } from '../../../store/axios';
import { useHistory , useLocation} from 'react-router-dom';
const Login = ()=>{
  const [email, setEmail] = useState("");
  const [pswd, setPassword] = useState("");
  const [{ sec }, dispatch] = useSession();
  const location = useLocation();
  const routeHistory = useHistory();
  let { from } = location.state || { from : {pathname:"/"}};
  const onClickHandler = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: SEC_FETCHING });
    try{
      const { data } = await publicaxios.post(
      "/api/security/login",
      {email:email, pswd:pswd}
    );
    dispatch({ type: SEC_LOGIN, payload: data });
    routeHistory.replace(from);
    } catch(ex){
      //Dispacth del error
    }
  };
  return (
    <Page showHeader={true} title="Login">
        <DataField
          labelText="Correo Electrónico"
          type="email"
          placeholder="correo@electrónico"
          value={email}
          name="email"
          id="email"
          title="Correo Electrónico"
          error=""
          onChange={(e)=>{setEmail(e.target.value)}}>
        </DataField>
        <DataField
          labelText="Contraseña"
          type="password"
          placeholder="Tu Contraseña"
          value={pswd}
          name="pswd"
          id="pswd"
          title="Contraseña"
          error=""
          onChange={(e)=>{ setPassword(e.target.value)}}>
        </DataField>
        <section style={{padding:"1rem"}}>
          <Button onClick={onClickHandler}>Iniciar Sesión</Button>
        </section>
    </Page>
  )
}

export default Login;
