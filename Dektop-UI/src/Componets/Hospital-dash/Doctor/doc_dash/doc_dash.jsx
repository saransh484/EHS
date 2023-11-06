import s from './doc_dash.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus, faPlus, faNotesMedical, faHospital,   faLinesLeaning, faQrcode, faUserDoctor, faTent } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import Sidebar from "../../sidebar.jsx";
library.add(faCirclePlus, faPlus, faNotesMedical, faHospital, faLinesLeaning, faQrcode, faUserDoctor, faTent)



function DOC_Dashboard() {

    const [open, setOpen] = useState(false);
    const [dr_name, setdr_name] = useState('')

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
                <div className={s.title}> Dr. Salunke </div>
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
                   <div className={s.appoints}>
                       <span>NAME</span>
                       <span>appointment</span>
                       <span>date</span>
                       <span>time</span>
                       <span>health issue</span>
                       <div className={s.assist_bt}>
                           <button onClick={handleClickToOpen}><i> <FontAwesomeIcon icon={["fa", "notes-medical",]}  style={{color: "#FFFFFF",}}/> </i>Presc</button>

                       </div>
                   </div>
                </div>
            </div>
            <div className={s.side}>
                <Sidebar/>
            </div>
        </div>
        </> 
        )
}

export default DOC_Dashboard