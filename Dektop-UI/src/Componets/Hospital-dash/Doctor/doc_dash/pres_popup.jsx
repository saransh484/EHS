//import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import s from './doc_dash.module.css'


function Innerpart() {
    return (
        <div>
            <div className={s.row_1}>
                <div className={s.inner}>
                    <label >Cause/Disease</label>
                    <input type="text" name="dis" id="dis"/>
                </div>
                <div className={s.inner_D} >
                    <label>Days</label>
                    <input type="text" name="" id=""/>
                </div>
            </div>
            <div className={s.sec} >
                <div className={s.inner}>
                    <label >Cause/Disease</label>
                    <input type="text" name="dis" id="dis"/>
                </div>
                
                <div className={s.sec} >
                    <div className={s.inner}>
                        <label for="">Morning</label>
                        <input type="checkbox" name="" id=""/>
                    </div>
                    <div className={s.inner}>
                        <label for="">Afternoon</label>
                        <input type="checkbox" name="" id=""/>
                    </div>
                    <div className={s.inner}>
                        <label for="">Night</label>
                        <input type="checkbox" name="" id=""/>
                    </div>
                </div>
                <div className={s.inner_D}>
                    <label>Days</label>
                    <input type="text" name="" id=""/>
                </div>
            </div>
            


        </div>
    )
}

function Popup_pres({open, onClose}) {
    //    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{"Add Prescribtion"}</DialogTitle>
                <DialogContent>
                    <Innerpart/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} 
                        color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        );
}
export default Popup_pres