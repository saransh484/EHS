import './reg-hos.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faCircle)


function Hospital_reg() {
    return <>

    <div>
        <div className="title">Register as Hospital</div>
    </div>
    
    <div className='linee'>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#E55771",}} /></i>
        <hr width="10%" color="#939497"/>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#939497",}} /></i>
        <hr width="10%" color="#939497"/>
        <i> <FontAwesomeIcon icon={['fa', 'circle']} style={{color:"#939497",}} /></i>
    </div>
    <div className='hehe'>
        <span>Contact Details</span>
        <span>Basic Details</span>
        <span>Verification</span>
    </div>    
    
    <div>
        <div className='sub-title'>Contact Details</div>
    </div>

    <div>

        <div className='inp-fields'>
            <div className='semi-input'>
                <label htmlFor="">Email Address</label>
                <input type="email" name="email" 
                    id="email" placeholder='Required for us to communicate with you' required/>
            </div>
            <div className='semi-input'>
                <label htmlFor="">Telephone Number</label>
                <input type="tel" name="telephone" 
                    id="telephone" placeholder='For patients to contact' required/>
            </div>
            <div className='semi-input'>
            <label htmlFor="">Mobile Number</label>
                <input type="tel" name="mob-num" 
                    id="mob-num" placeholder='For solving queries' required/>
            </div>
        </div>

        <div className='button-saveCont'>
            <button>Save and Continue</button>
        </div>

    </div>

    </>
}

export default Hospital_reg 