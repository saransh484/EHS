import s from './doc_p.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import axios from "axios";
import Sidebar from "../../sidebar.jsx";
import ss from './dlg.module.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
library.add(faCirclePlus)



function Doc_Prof() {

    const [open, setOpen] = React.useState(false);
    const [ email, setemail] = useState('')
    const [ special, setspecial] = useState('')
    const [ d_name, setd_name] = useState('')
    const [ phone, setphone] = useState('')
    const [data, setDataIn] = useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };

    
    const [name, setname] = useState('');

//        useEffect(()=>{
//            axios.get('').then(respnse=>{
//                setname(respnse.data)
//            })
//        },[])
//    console.log(id, data)
    const submitThis = async (e) => {
        e.preventDefault();
        setOpen(false);

        const info = {name:name, spec:special, email:email, phone:phone}
        setDataIn([info])

        try {
            const response = await axios.post('https://ehs-q3hx.onrender.com/api/addDoc',info);
            console.log(response.data) 
        } catch (error) {
            console.error(error)
        }

    }
    
    return(
        <>
        <div className={s.whole_screen}>
            <div className={s.upar}>
                <div className={s.title}> Bombay Hospital, Indore </div>
                <i> <FontAwesomeIcon icon={["fa", "circle-plus",]} size={"3x"} style={{color: "#E55771",}}/> </i>
            </div>
            <div className={s.sub_upar}>
                <div className={s.login_button}>
                    <button onClick={handleClickOpen} >Create New Doctor Profile</button>
                    <React.Fragment>
                        <Dialog
                            open={open}
                            onClose={submitThis}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            >
                            <DialogTitle id="alert-dialog-title">
                                {"Doctor Profile"}
                            </DialogTitle>
                            <DialogContent>
                                <div className={ss.box}>

                                    <div className={ss.inp}>
                                        <div className={ss.semi_inp} >
                                            <label>Email Address</label>
                                            <input type="text" placeholder={'Email ID'}
                                                value={email} onChange={(e)=>setemail(e.target.value)}   />
                                        </div>
                                        <div className={ss.semi_inp}>
                                            <label>Speciality</label>
                                            <input type="text" name="special" id="special"
                                                value={special} onChange={(e)=>setspecial(e.target.value)}/>
                                        </div>

                                    </div>

                                    <div className={ss.inps}>
                                        <div className={ss.semi_inp} >
                                            <label>Name</label>
                                            <input type="text" name="d_name" id="d_name"
                                                value={d_name} onChange={(e)=>setd_name(e.target.value)}/>
                                        </div>
                                        <div className={ss.semi_inp} >
                                            <label>Phone Number</label>
                                            <input type="text" name="phone" id="phone"
                                                value={phone} onChange={(e)=>setphone(e.target.value)}/>
                                        </div>
                                    </div>

                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitThis} autoFocus>
                                    Create
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </div>
                <div className={s.title}> Diagnostic History </div>
            </div>
            <div className={s.side}>
                <Sidebar/>
            </div>

            <div className={s.main_maal}>

                <div className={s.card}>
                    <span className={s.p_name} >Dr. Salunke</span>
                    <span>Heart Surgeon</span>
                    <span>salunke@gmail.com</span>
                </div>
                <div className={s.card}>
                    <span className={s.p_name} >Dr. Salunke</span>
                    <span>Heart Surgeon</span>
                    <span>salunke@gmail.com</span>
                </div>
                <div className={s.card}>
                    <span className={s.p_name} >Kidney Attack</span>
                    <span>Diagnosed on:</span>
                    <span>Diagnosed by:</span>
                    <span>Mediactions:</span>
                </div>
                <div className={s.card}>
                <span className={s.p_name} >Kidney Attack</span>
                <span>Diagnosed on:</span>
                <span>Diagnosed by:</span>
                <span>Mediactions:</span>
            </div>
            </div>
            
        </div>
        </>
        )
}

export default Doc_Prof