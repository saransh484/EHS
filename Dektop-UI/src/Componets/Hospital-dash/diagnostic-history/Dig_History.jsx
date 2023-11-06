import s from './dig.module.css'
import Sidebar from "../sidebar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
library.add(faCirclePlus)



function Dig_History() {
    
    const {state} = useLocation();
    const { id, data } = state;
    
    const [name, setname] = useState('');
    
//    useEffect(()=>{
//        axios.get('').then(respnse=>{
//            setname(respnse.data)
//        })
//    },[])
    console.log(id, data)
    
    return(
        <>
        <div className={s.whole_screen}>
            <div className={s.upar}>
                <div className={s.title}> Bombay Hospital, Indore </div>
                <i> <FontAwesomeIcon icon={["fa", "circle-plus",]} size={"3x"} style={{color: "#E55771",}}/> </i>
            </div>
            <div className={s.sub_upar}>
                <div className={s.title}> Diagnostic History </div>
            </div>
            <div className={s.side}>
                <Sidebar/>
            </div>

            <div className={s.main_maal}>
                
                <div className={s.card}>
                    <span className={s.p_name} >Kidney Attack</span>
                    <span>Diagnosed on:</span>
                    <span>Diagnosed by:</span>
                    <span>Mediactions:</span>
                </div>
                
            </div>
            <div className={s.sub_main}>
                <div className={s.p_text}>
                    <span className={s.p_name}>Venugopal Iyer</span>
                    <span>age:</span>
                    <span>height:</span>
                    <span>weight:</span>
                </div>
                <div className={s.problems}>
                    <span>High BP</span>
                    <span>Pre-dib</span>
                </div>
                
            </div>
        </div>
        </>
        )
}

export default Dig_History