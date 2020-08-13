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
    AppBar
} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import axios from "axios";
import {decode} from "./utils/utils";

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
        flexGrow: 1,
        display: "block"
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
        position: "fixed",
        bottom: 0,
        width: "100%"
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Innovative IKE
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function App() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [data, setData] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fetchData = () => {
        axios.get('http://localhost:9000/user').then((res) => {
            setData(decode(res.data).rows);
        })
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <Fragment>
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.root}>
                    <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Sign In" {...a11yProps(0)} />
                        <Tab label="Sign Up" {...a11yProps(1)} />
                        <Tab label="Users" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <SignIn/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SignUp setValue={setValue} fetchData={fetchData}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Fragment>
                        <Table data={data} fetchData={fetchData}/>
                    </Fragment>
                </TabPanel>
            </div>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Test Project with React-Hooks
                </Typography>
                <Copyright/>
            </footer>
        </Fragment>
    );
}

export default App;
