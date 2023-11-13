import s from './sidebar.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus, faPlus, faNotesMedical, faHospital,   faLinesLeaning, faQrcode, faUserDoctor, faTent } from '@fortawesome/free-solid-svg-icons'
library.add(faCirclePlus, faPlus, faNotesMedical, faHospital, faLinesLeaning, faQrcode, faUserDoctor, faTent)

function Sidebar(){
    return(
        <div>
            <div className={s.sidee}>
                <div className={s.logo_name}>
                    <i> <FontAwesomeIcon icon={["fa", "hospital",]} size={'3x'}  style={{color: "#E55771",}}/></i>
                    <div className={s.titlee}>EHS </div>
                </div>
                <div className={s.side_mainn}>
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
        </div>
    )
}

export default Sidebar