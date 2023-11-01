import s from './scan.module.css'
import Sidebar from "../sidebar.jsx";
import {QrScanner} from "@yudiel/react-qr-scanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import {width} from "@fortawesome/free-solid-svg-icons/fa0";
library.add(faCirclePlus)



function Scan_page() {

    return(
        <>
        <div className={s.whole_screen}>
            <div className={s.upar}>
                <div className={s.title}> Bombay Hospital, Indore </div>
                <i> <FontAwesomeIcon icon={["fa", "circle-plus",]} size={"3x"} style={{color: "#E55771",}}/> </i>
            </div>
            <div className={s.sub_upar}>
                <div className={s.title}> Scan ID </div>
            </div>
            <div className={s.side}>
                <Sidebar/>
            </div>
            
            <div className={s.main_maal}>
                <QrScanner
                    containerStyle={{
                    width:"30%", paddingTop:"30%",
                        margin:'0 0 0 20rem',
                }}
//                    videoStyle={{width:"50%", left:"10rem"}}
                    onDecode={(result) => console.log("ans", result)}
                    onError={(error) => console.log(error?.message)}
                />
            </div>
            <div className={s.bottom}>
                Place the QR Code between the box
            </div>
        </div>
        </>
        )
}

export default Scan_page