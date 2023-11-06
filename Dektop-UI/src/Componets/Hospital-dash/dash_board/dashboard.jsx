import s from './dash.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus, faPlus, faNotesMedical, faHospital,   faLinesLeaning, faQrcode, faUserDoctor, faTent } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import Popup_box from "./popup.jsx";
library.add(faCirclePlus, faPlus, faNotesMedical, faHospital, faLinesLeaning, faQrcode, faUserDoctor, faTent)



function EHS_Dashboard() {
    
    const [open, setOpen] = useState(false);

    const handleClickToOpen = () => {
        setOpen(true);

    };

    const handleToClose = () => {
        setOpen(false);
    };

    return(
        <>
        <div className={s.whole_screen}>
            <div className={s.upar}>
                <div className={s.title}> Bombay Hospital, Indore </div>
                <i> <FontAwesomeIcon icon={["fa", "circle-plus",]} size={"3x"} style={{color: "#E55771",}}/> </i>
            </div>
            <div className={s.sub_upar}>
                <div className={s.sub_sub_upar}>
                    <div className={s.title}> Appointments </div>
                    <div className={s.new_btn}>
                        <button><i> <FontAwesomeIcon icon={["fa", "plus",]}  style={{color: "#FFFFFF",}}/> </i>NEW</button>
                    </div>
                </div>
                <div className={s.two_sub_upar}>
                    <span>NAME</span>
                    <span>appointment</span>
                    <span>date</span>
                    <span>time</span>
                    <span>health issue</span>
                    <div className={s.assist_btn}>
                        <button onClick={handleClickToOpen}><i> <FontAwesomeIcon icon={["fa", "notes-medical",]}  style={{color: "#FFFFFF",}}/> </i>Assist</button>
                        <Popup_box open={open} onClose={handleToClose}/>
                    </div>
                </div>
            </div>
            <div className={s.side}>
                <div className={s.logo_name}>
                    <i> <FontAwesomeIcon icon={["fa", "hospital",]} size={'3x'}  style={{color: "#E55771",}}/></i>
                    <div className={s.title}>EHS </div>
                </div>
                <div className={s.side_main}>
                    <div className={s.chhotu}>
                        <i> <FontAwesomeIcon icon={["fa", "lines-leaning",]} size={'2x'}  style={{color: "#2A2B3F",}}/></i>
                        <span>Appointments</span>
                    </div>
                    <div className={s.chhotu}>
                        <i> <FontAwesomeIcon icon={["fa", "qrcode",]} size={'2x'}  style={{color: "#2A2B3F",}}/></i>
                        <span>Scan</span>
                    </div>
                    <div className={s.chhotu}>
                        <i> <FontAwesomeIcon icon={["fa", "user-doctor",]} size={'2x'}  style={{color: "#2A2B3F",}}/></i>
                        <span> Doctor Profile</span>
                    </div>
                    <div className={s.chhotu}>
                        <i> <FontAwesomeIcon icon={["fa", "tent",]} size={'2x'}  style={{color: "#2A2B3F",}}/></i>  
                        <span>Create Camp Event</span>
                    </div>
                </div>
            </div>
            <div className={s.main_maal}>
                main
            </div>
            </div>
        </>
    )
}

export default EHS_Dashboard