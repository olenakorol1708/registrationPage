
import './App.css';
import {Routes,Route} from 'react-router-dom';
import{Home} from './pages/Home.jsx';
import {Login} from './pages/Login.jsx';
import {Registration} from './pages/Registration.jsx';
import{Notfound} from './pages/Notfound.jsx';
import { Todopage } from './pages/Todopage';
import {Protected} from './components/Protected.jsx';
import {Layout} from './components/Layout.jsx';
// import dotenv from 'dotenv';
 




function App(isLoggedIn) {



  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/todopage"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Todopage />
              </Protected>
            }
          />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </>
  );
}









export default App;
