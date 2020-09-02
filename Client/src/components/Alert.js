import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ({alert, setAlert}) {
    const {severity, message, openAlert} = alert;
    return (
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setAlert({...alert, openAlert: false})}>
            <Alert onClose={() => setAlert({...alert, openAlert: false})} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}