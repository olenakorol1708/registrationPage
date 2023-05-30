import {Navigate} from 'react-router-dom';

const Protected = ({isLoggedIn,children})=>{
    if(!isLoggedIn){
        return <Navigate to = 'Notfound' />
    }
    return children;
}
export  {Protected};