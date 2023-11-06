import { useState } from 'react'
import s from './doc.module.css'
import axios from 'axios'

function Doc_signin() {

    const [doctor_id, setdoctor_id] = useState('')
    const [password , setpassword] = useState('')
    const [dataIn, setDataIn] = useState('')


    const submitThis = async (e) => {
        e.preventDefault();

        const info = {docid:doctor_id, pass:password}
        setDataIn([info])

        try {
            const response = await axios.post('https://ehs-q3hx.onrender.com/api/loginDoc',info);
            console.log(response.data) 
        } catch (error) {
            console.error(error)
        } 

    }

    return (
        <>
        <div className={s.form}>
            <form action='' method='POST' onSubmit={submitThis}>
                <div className="title">
                    EHS Doctor Login
                </div>
                <div className={s.inp_fields}>
                    <input type="text" name="doctor_id" 
                        value={doctor_id} onChange={(e)=>setdoctor_id(e.target.value)}  
                        id="doctor_id" placeholder='Doctor ID' required/>
                    <input type="password" name="password" 
                        value={password} onChange={(e)=>setpassword(e.target.value)} 
                        id="password" placeholder='Password' required/>
                </div>
                <div className={s.login_button}>
                    <button type="submit" >Login</button>
                </div>
            </form>
        </div>
        </>
        )
}

export default Doc_signin