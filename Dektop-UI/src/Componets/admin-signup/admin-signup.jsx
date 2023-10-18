import { useState } from 'react'
import './A_signup.css'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faCircleCheck)

function Admin_signup() {

    const [mobile_otp, setMobile_otp] = useState('')
    const [email_otp , setemail_otp] = useState('')


    const submitThis = async (e) => {
        e.preventDefault();

        const info = {m_otp:mobile_otp, e_otp:email_otp}
        
        try {
            const response = await axios.post('/api/otp',info);
            console.log(response.data) 
        } catch (error) {
            console.error(error)
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
                    <div className='inp-child'>
                    <i> <FontAwesomeIcon icon={["fa", "circle-check"]} style={{color: "#33d17a",}}/> </i>
                    <input type="text" name="mobile_otp" 
                        value={mobile_otp} onChange={(e)=>setMobile_otp(e.target.value)}  
                        id="mobile_otp" placeholder='OTP' required/>
                    
                    </div>
                    <div className='inp-child'>  
                        <button type="" >Verify Mobile</button>
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
                        <button type="" >Verify Email</button>
                    </div>
                </div>
            </div>
            
            <div className='login-button'>  
                <button type="submit" onClick={submitThis} >Login</button>
            </div>
        </div>
        </>
    )
}   

export default Admin_signup
