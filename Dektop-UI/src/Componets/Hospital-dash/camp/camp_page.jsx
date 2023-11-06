import s from './camp.module.css'
import Sidebar from "../sidebar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import axios from "axios";
library.add(faCirclePlus)




function Camp_page() {
    
    const [title, settitle] = useState('')
    const [age, setage] = useState('')
    const [pin, setpin] = useState('')
    const [startdate, setstartdate] = useState('')
    const [enddate, setenddate] = useState('')
    const [boost, setboost] = useState('')
    const [data, setdata] = useState('')
    const [loading, setLoading] = useState(false);


    const submitThis = async () => {

        const info = {title:title, age:age, pin:pin, startdate:startdate, enddate:enddate, boost:boost}

        try {
            setLoading(true)
            const response = await axios.post('/api/',info);
            console.log(response.data)
            setdata(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
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
                <div className={s.title}> Create Camp Event </div>
            </div>
            <div className={s.side}>
                <Sidebar/>
            </div>

            <div className={s.main_maal}>
                
                <div className={s.inp_fields}>
                    <div className={s.semi_input}>
                        <label htmlFor="">Camp Title</label>
                        <input type="text" name="text"
                            value={title} onChange={(e)=>settitle(e.target.value)}
                            id="text" placeholder='Enter Full Name  ' required/>
                    </div>
                    <div className={s.semi_input}>
                        <label htmlFor="">Age Group</label>
                        <select name="age" id=""
                            value={age} onChange={(e)=> setage(e.target.value)}>
                            <option value="Government">Government</option>
                            <option value="Private">Private</option>
                            <option value="Hota hoga aur">Hota hoga aur</option>
                        </select>
                    </div>
                    <div className={s.semi_input}>
                        <label htmlFor="">PIN</label>
                        <input type="number" name="pin"
                            value={pin} onChange={(e)=> setpin(e.target.value)}
                            id="staff-number" placeholder='Management Staff' required/>
                    </div>
                </div>
                <div className={s.inp_fields}>
                    <div className={s.semi_input}>
                        <label htmlFor="">Start Date</label>
                        <input type="date" name="date"
                            value={startdate} onChange={(e)=> setstartdate(e.target.value)}
                            id="city-text" placeholder='Enter City Name' required/>
                    </div>
                    <div className={s.semi_input}>
                        <label htmlFor="">End date</label>
                        <input type="date" name="state"
                            value={enddate} onChange={(e)=> setenddate(e.target.value)}
                            id="telephone" placeholder='For patients to contact' required/>
                    </div>
                    <div className={s.semi_input}>
                        <label htmlFor="">Boot Reach</label>
                        <select name="boost" id="alw_apnt_bk"
                            value={boost} onChange={(e)=> setboost(e.target.value)}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
                <div className={s.amount}>
                    <span>Amount Payable </span>
                </div>
                <div className={s.button_pay}>
                    <button>Save and Continue</button>
                </div>
            </div>
            
            
        </div>
        </>
        )
}

export default Camp_page