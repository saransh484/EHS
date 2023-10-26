import s from './verify.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";
import {updateFormField} from "../../../redux-stuff/form_action.js";
import axios from 'axios'
library.add(faCircle)
const Verificaton_page = ({email, tel_no, mob_no, h_name, owner, staff, city, state, pin, type, feature, year_est, pvt_path, path_lic, alw_apnt_bk, addr1, addr2, addr3,tan_no, pan, updateFormField}) =>{
    const handleSubmit = async (e) => {
            // Handle the submission of data (e.g., API request) with the form fields
        const info = {
            email: email,
            tel_no: tel_no,
            mob_no: mob_no,
            h_name: h_name,
            owner:owner,
            staff:staff,
            city:city,
            state:state,
            pin:pin,
            type:type,
            feature:feature,
            year_est:year_est,
            pvt_path:pvt_path,
            path_lic:path_lic,
            alw_apnt_bk:alw_apnt_bk,
            addr1:addr1,
            addr2:addr2,
            addr3:addr3,
            tan_no: tan_no,
            pan:pan
        }
        console.log(info)
        try {
            const response = await axios.post('/api/',info);
            console.log(response.data) 
        } catch (error) {
            console.error(error)
        }
    };
    
    return <>

    <div>
        <div className={s.title}>Register as Hospital</div>
    </div>

    <div className={s.linee}>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#E55771",}} /></i>
        <hr width="10%" color="#939497"/>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#E55771",}} /></i>
        <hr width="10%" color="#939497"/>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#E55771",}} /></i>
    </div>
    <div className={s.hehe}>
        <span>Contact Details</span>
        <span>Basic Details</span>
        <span>Verification</span>
    </div>    

    <div>
        <div className={s.subs_title}>Contact Details</div>
    </div>

    <div>

        <div className={s.inp_fields}>
            <div className={s.semi_input}>
                <label htmlFor="">TAN Number</label>
                <input type="text" name="tan-num"
                    value={tan_no} onChange={(e)=> updateFormField('tan_no', e.target.value)}
                    id="tan-num" placeholder='' />
            </div>
            <div className={s.semi_input}>
                <label htmlFor="">PAN Number (If no TAN)</label>
                <input type="text" name="pan"
                    value={pan} onChange={(e)=> updateFormField('pan', e.target.value)}
                    id="pan-num" placeholder='' />
            </div>
            <div className={s.semi_input}>
                <label htmlFor="">Govt issued License</label>
                <input type="file" name="gov-lic" 
                    id="gov-lic" placeholder='' required/>
            </div>
        </div>

        <div className={s.button_saveCont} >
            <button onClick={handleSubmit} >Submit</button>
        </div>

    </div>

    </>
}

const mapStateToProps = (state) => {
    return {
        email: state.form.email,
        tel_no: state.form.tel_no,
        mob_no: state.form.mob_no,
        h_name: state.form.h_name,
        owner:state.form.owner,
        staff:state.form.staff,
        city:state.form.city,
        state:state.form.state,
        pin:state.form.pin,
        type:state.form.type,
        feature:state.form.feature,
        year_est:state.form.year_est,
        pvt_path:state.form.pvt_path,
        path_lic:state.form.path_lic,
        alw_apnt_bk:state.form.alw_apnt_bk,
        addr1:state.form.addr1,
        addr2:state.form.addr2,
        addr3:state.form.addr3,
        tan_no: state.form.tan_no,
        pan:state.form.pan
    };
};

export default connect(mapStateToProps,{updateFormField})(Verificaton_page)