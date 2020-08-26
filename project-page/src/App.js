import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import SignIn from "./components/SignIn";
import Table from "./components/Table";
import SignUp from "./components/SignUp";
import {
    Tabs,
    Tab,
    Box,
    AppBar, Toolbar, Link as LinkMaterial
} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {decode} from "./utils/utils";
import Flag from './components/Flag';
import Container from "@material-ui/core/Container";
import stringValues from "./strings.json"
import {BrowserRouter, Route, Link, Switch,Redirect } from "react-router-dom";

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
            <LinkMaterial color="inherit" href="https://innovative.gr/">
                Innovative IKE
            </LinkMaterial>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function App() {
    const allTabs = ['', '/signup', '/user'];
    const [flag, setFlag] = useState((window.location.pathname.indexOf("en")!==-1)?"en":"el");
    const classes = useStyles();
    const [value, setValue] = React.useState((window.location.pathname.indexOf('/el')!==-1||window.location.pathname.indexOf('/en')!==-1)?window.location.pathname:'');
    const [data, setData] = useState([]);
    console.log(value)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchData = () => {
        axios.get('/user').then((res) => {
            setData(decode(res.data).rows);
        }).catch(() => {
            setData([])
        })
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <BrowserRouter>
            <div className={classes.root}>
                <div className={classes.contentWrap}>
                    <AppBar position="absolute">
                        <Toolbar className={classes.toolbar}>
                            <Tabs value={String(value).replace('/en','').replace('/el','')} centered onChange={handleChange} aria-label="simple tabs example">
                                <Tab label={stringValues[flag].signIn} value={`${allTabs[0]}`} component={Link}
                                     to={`/${flag}${allTabs[0]}`} {...a11yProps(0)}/>
                                <Tab label={stringValues[flag].signUp} value={`${allTabs[1]}`} component={Link}
                                     to={`/${flag}${allTabs[1]}`} {...a11yProps(1)}/>
                                <Tab label={stringValues[flag].user} value={`${allTabs[2]}`} component={Link}
                                     to={`/${flag}${allTabs[2]}`} {...a11yProps(2)}/>
                            </Tabs>
                            <div className={classes.grow}/>
                            <Flag flag={flag} setFlag={setFlag} stringValues={stringValues[flag]}/>

                        </Toolbar>
                    </AppBar>

                </div>
                <footer className={classes.footer}>
                    <Container maxWidth="sm">
                        <Typography variant="body1" align="center">Test Project with React/hooks</Typography>
                        <Copyright/>
                    </Container>
                </footer>
                <Switch>
                    <Route path={`/${flag}${allTabs[1]}`} render={() => <div><SignUp setValue={setValue} fetchData={fetchData}
                                                                        stringValues={stringValues[flag]}/></div>} />
                    <Route path={`/${flag}${allTabs[2]}`} render={() => <Table data={data} fetchData={fetchData}
                                                                  stringValues={stringValues[flag]}/>}/>
                    <Route path={`/${flag}${allTabs[0]}`} render={() => <SignIn stringValues={stringValues[flag]}/>} exact/>
                    <Redirect from={window.location.pathname} to={`/${flag}${allTabs[0]}`}/>
                </Switch>
            </div>

        </BrowserRouter>
    );
}

export default App;
