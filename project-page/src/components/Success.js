import React, {Fragment} from 'react'
import {CssBaseline} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        paddingBottom: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));
export default (props) => {
    const {stringValues} = props;
    const action = window.location.pathname.slice(12) === 'signin';
    const classes = useStyles();
    return (
        <Fragment>
            <CssBaseline/>
            <div className={classes.paper}>
                <CssBaseline/>
                <svg fill="green" xmlns="http://www.w3.org/2000/svg" width="350" height="350" viewBox="0 0 24 24">
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h2>{(action)?stringValues.signInSuc:stringValues.signUpSuc}</h2>
            </div>
        </Fragment>
    )
}