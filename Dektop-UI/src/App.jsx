import './App.css'

import {Routes , Route} from "react-router-dom";

import Admin_login from './Componets/admin-login/admin-login';
import Admin_signup from './Componets/admin-signup/admin-signup.jsx';
import Hospital_reg from './Componets/register-hospital/contact/register-hospital.jsx';
import Basic_detail from "./Componets/register-hospital/basic-details/basic_detail.jsx";
import Verificaton_page from "./Componets/register-hospital/verification/verificaton_page.jsx";
import EHS_Dashboard from "./Componets/Hospital-dash/dash_board/dashboard.jsx";


function App() {

  return (
    <div>
      <EHS_Dashboard/>
      <Routes>
        <Route path={'/reg_contact'} element={<Hospital_reg/>}/>
        <Route path={'/reg_basic_detail'} element={<Basic_detail/>} />
        <Route path={'/reg_verify'} element={<Verificaton_page/>}/>
      </Routes>
    </div>
  )
}

export default App
