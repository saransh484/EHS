import { useState } from 'react'
import './A_signup.css'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faCircleCheck)
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {updateFormField} from "../../redux-stuff/form_action.js";

function Admin_signup() {

    const navigate = useNavigate()

    const [em_ok, setem_ok] = useState(false)
    const [ph_ok, setph_ok] = useState(false)

    const [mobile_otp, setMobile_otp] = useState('')
    const [email_otp , setemail_otp] = useState('')

    const {state} = useLocation();



    console.log("FRESH DATA  : ", state)

    const submitThis = () => {
        navigate('/basic_detail')
    }

    const verifyPhone = async () => {
        const info = {mobile:mob, otp:mobile_otp}
        try {
            const response = await axios.post('https://ehs-q3hx.onrender.com/api/verifyMobile',info);
            console.log(response);
            setph_ok(true)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const verifyEmail = async () => {
        const info = {mail:'', otp:email_otp}
        try {
            const response = await axios.post('https://ehs-q3hx.onrender.com/api/verifyMail',info);
            console.log(response);
            setem_ok(true)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const verifyOK = () => {
        if (em_ok && ph_ok){
            submitThis()
        }
    }

    return (
        <>
        <div>
        
            <div className="title">
                EHS Admin SignUp
            </div>
            
            <div className='inp-fields'>
                <div>
                    <span>test otp : {otp}</span>
                    <div className='inp-child'>
                    <i> <FontAwesomeIcon icon={["fa", "circle-check"]} style={{color: "#33d17a",}}/> </i>
                    <input type="text" name="mobile_otp" 
                        value={mobile_otp} onChange={(e)=>setMobile_otp(e.target.value)}  
                        id="mobile_otp" placeholder='OTP' required/>
                    
                    </div>
                    <div className='inp-child'>
                        <button type="" onClick={verifyPhone} >Verify Mobile</button>
                    </div>
                </div>
                
                <div>
                    <div className='inp-child'>
                    <i> <FontAwesomeIcon icon={["fa", "circle-check"]} style={{color: "#33d17a",}}/> </i>
                    <input type="text" name="email_otp" 
                        value={email_otp} onChange={(e)=>setemail_otp(e.target.value)} 
                        id="email_otp" placeholder='OTP' required/>
                    </div>
                    <div className='inp-child'>  
                        <button type="" onClick={verifyEmail} >Verify Email</button>
                    </div>
                </div>
            </div>
            
            <div className='login-button'>  
                <button type="submit" onClick={verifyOK} >Login</button>
            </div>
        </div>
        </>
    )
}   
export default (Admin_signup)
