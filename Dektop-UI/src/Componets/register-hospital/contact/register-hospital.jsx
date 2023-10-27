import s from './reg-hos.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";
import {updateFormField} from "../../../redux-stuff/form_action.js";
import {Link} from "react-router-dom";
import axios from "axios";
library.add(faCircle)


function Hospital_reg({email, tel_no, mob_no, updateFormField}) {

    const submitThis = async (e) => {
        e.preventDefault();

        const info = {phone:mob_no}
        
        try {
            const response = await axios.post('https://ehs-q3hx.onrender.com/api/registration',info);
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return <>

    <div>
        <div className={s.title}>Register as Hospital</div>
    </div>
    
    <div className={s.linee}>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#E55771",}} /></i>
        <hr width="10%" color="#939497"/>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#939497",}} /></i>
        <hr width="10%" color="#939497"/>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#939497",}} /></i>
    </div>
    <div className={s.hehe}>
        <span>Contact Details</span>
        <span>Basic Details</span>
        <span>Verification</span>
    </div>    
    
    <div>
        <div className={s.sub_title}>Contact Details</div>
    </div>

    <div>

        <div className={s.inp_fields}>
            <div className={s.semi_input}>
                <label htmlFor="">Email Address</label>
                <input type="email" name="email"
                    value={email} onChange={(e)=> updateFormField('email', e.target.value)}
                    id="email" placeholder='Required for us to communicate with you' required/>
            </div>
            <div className={s.semi_input}>
                <label htmlFor="">Telephone Number</label>
                <input type="tel_no" name="telephone"
                    value={tel_no} onChange={(e)=> updateFormField('tel_no', e.target.value)}
                    id="telephone" placeholder='For patients to contact' required/>
            </div>
            <div className={s.semi_input}>
            <label htmlFor="">Mobile Number</label>
                <input type="tel" name="mob_no"
                    value={mob_no} onChange={(e)=> updateFormField('mob_no', e.target.value)}
                    id="mob-num" placeholder='For solving queries' required/>
            </div>
        </div>

        <div className={s.button_saveCont}>
            {/*<Link to={"/reg_basic_detail"}>*/}
                <button onClick={submitThis} >Save and Continue</button>
            {/*</Link>?*/}
        </div>

    </div>

    </>
}

const mapStateToProps = (state) => {
    return {
        email: state.form.email,
        tel_no: state.form.tel_no,
        mob_no: state.form.mob_no,
    };
};

export default connect(mapStateToProps, {updateFormField})(Hospital_reg)