//import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

function Popup_box({open, onClose}) {
//    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{"Available Doctors"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Doctors List Here
                    </DialogContentText>
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
export default Popup_box