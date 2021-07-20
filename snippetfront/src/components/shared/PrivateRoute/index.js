import {Route, Redirect, useLocation} from 'react-router-dom';
import {useSession} from '../../../hooks/Session';

const PrivateRoute = (props)=>{
  const {component: MyComponent, ...rest} = props;
  const [{sec}, ] = useSession();
  return (
    <Route
      {...rest}
      render={
        (props) => {
          const {location} = props;
          return (
            (sec.isLogged) ?
              (<MyComponent {...props} />) :
              (<Redirect to={{
                pathname:"/login",
                state: {from:location}
              }} />)
          )
        }
      }
    />
  );
}

export default PrivateRoute;
