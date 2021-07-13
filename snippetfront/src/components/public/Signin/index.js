import DataField from  '../../shared/DataField/DataField';

import {useState} from 'react';

const Signin = ()=>{
  const [email, setEmail] = useState();
  const  [pswd, setPassword] = useState();
  return (
    <section>
      <h1>Sigin</h1>
      <form>
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
      </form>
      
    </section>
  )
}

export default Signin;
