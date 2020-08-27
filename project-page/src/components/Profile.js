import React, {Fragment, useEffect, useState} from "react";
import {Email as EmailIcon, Cake as CakeIcon, AssignmentInd} from '@material-ui/icons';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    ListItemText,
    ListItemAvatar,
    Divider,
    ListItem,
    List,
    Avatar,
    CssBaseline,
    Typography,
    Fab,
    Toolbar
} from "@material-ui/core";
import axios from 'axios';
import {decode} from "../utils/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(15),
        paddingBottom: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: "50%",
        backgroundColor: "#3f51b5",
        color: "white",
        flexDirection: 'column',
        alignItems: 'center',
        '@media (max-width:1300px)': {
            width: "100%",
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    header: {
        marginTop: theme.spacing(4),
        fontSize: 40,
        '@media (max-width:600px)': {
            fontSize: 20
        }
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -55,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    box: {
        width: "50%",
        '@media (max-width:1300px)': {
            width: "100%"
        }
    }

}));

export default (props) => {
    const [open, setOpen] = useState(false);
    const {stringValues} = props;
    const userID = String(window.location.pathname).slice(12)
    const classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            setOpen(true);
            const res = await axios.get(`/user/profile/${userID}`);
            setData(decode(res.data).rows[0]);
            setOpen(false);
        })();
    }, [userID])
    return (

        <Fragment>
            <CssBaseline/>

            <div>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </div>
            <div className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Fab color="primary" aria-label="add" className={classes.fabButton}>
                        <Avatar color="primary" className={classes.avatar}/>
                    </Fab>
                    <Typography className={classes.header}>{data.username}</Typography>
                    <Typography variant="h6">{`${stringValues.userid}: ${userID}`}</Typography>
                </Toolbar>
                <Box boxShadow={3} className={classes.box}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EmailIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={stringValues.email} secondary={data.email}/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AssignmentInd/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={stringValues.gender} secondary={data.gender}/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CakeIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={stringValues.birthDay}
                                          secondary={String(data.bornday).slice(0, 10)}/>
                        </ListItem>
                    </List>
                </Box>
            </div>

        </Fragment>
    )
}