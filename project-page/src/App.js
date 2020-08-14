import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import SignIn from "./components/SignIn";
import Table from "./components/Table";
import SignUp from "./components/SignUp";
import {
    Tabs,
    Tab,
    Box,
    AppBar, Toolbar
} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import axios from "axios";
import {decode} from "./utils/utils";
import Flag from './components/Flag';
import Container from "@material-ui/core/Container";
import stringValues from "./strings.json"

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        minHeight: "100vh"
    },
    toolbar: {
        minHeight: "auto"
    },
    grow: {
        flexGrow: 1,
    },
    contentWrap: {
        paddingBottom: "2.5rem"
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
        position: "absolute",
        bottom: 0,
        width: "100%",
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://innovative.gr/">
                Innovative IKE
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function App() {
    const [flag, setFlag] = useState('el');
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fetchData = () => {
        axios.get('http://localhost:9000/user').then((res) => {
            setData(decode(res.data).rows);
        }).catch((err) => {
            setData([])
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={classes.root}>
            <div className={classes.contentWrap}>
                <AppBar position="absolute">
                    <Toolbar className={classes.toolbar}>
                        <Tabs value={value} centered onChange={handleChange} aria-label="simple tabs example">
                            <Tab label={stringValues[flag].signIn} {...a11yProps(0)} />
                            <Tab label={stringValues[flag].signUp} {...a11yProps(1)} />
                            <Tab label={stringValues[flag].user} {...a11yProps(2)} />
                        </Tabs>
                        <div className={classes.grow}/>
                        <Flag flag={flag} setFlag={setFlag} stringValues={stringValues[flag]}/>

                    </Toolbar>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <SignIn stringValues={stringValues[flag]}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SignUp setValue={setValue} fetchData={fetchData} stringValues={stringValues[flag]}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Fragment>
                        <Table data={data} fetchData={fetchData} stringValues={stringValues[flag]}/>
                    </Fragment>
                </TabPanel>
            </div>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1" align="center">Test Project with React/hooks</Typography>
                    <Copyright/>
                </Container>
            </footer>
        </div>
    );
}

export default App;
