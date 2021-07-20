import axios from 'axios';

export const publicaxios = axios.create();
export const privateaxios = axios.create();

publicaxios.defaults.baseURL = process.env.REACT_APP_URL;
publicaxios.defaults.headers.common['cache-control'] = "no-cache";
publicaxios.defaults.headers.post['Content-Type'] = "application/json";
publicaxios.defaults.headers.put['Content-Type'] = "application/json";

privateaxios.defaults.baseURL = process.env.REACT_APP_URL;
privateaxios.defaults.headers.common['cache-control'] = "no-cache";
privateaxios.defaults.headers.post['Content-Type'] = "application/json";
privateaxios.defaults.headers.put['Content-Type'] = "application/json";

export const setJWT = (jwt) => {
  privateaxios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export const setUnAuthInterceptor = (handler)=>{
  privateaxios.interceptors.response.use(
    ( response )=>{
      return response;
    },
    ( error )=>{
      if(error.response){
        switch (error.response.status) {
          case 401:
            handler();
            break;
          default:
            console.log(error);
        }
      } else {
        console.log(error)
      }
      return Promise.reject(error);
    }
  ); // end use
}
//export default { publicaxios, privateaxios, setJWT };
