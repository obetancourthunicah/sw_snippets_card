import DataField from  '../../shared/DataField/DataField';
import Page from '../../shared/Page/Page';
import {useState} from 'react';

const Signin = ()=>{
  const [email, setEmail] = useState();
  const  [pswd, setPassword] = useState();
  return (
    <Page showHeader title="Sign In">
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
    </Page>
  )
}

export default Signin;
