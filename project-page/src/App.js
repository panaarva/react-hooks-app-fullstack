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
        paddingBottom: "2.5rem"    /* Footer height */
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
            <Link color="inherit" href="https://material-ui.com/">
                Innovative IKE
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function App() {
    const stringValues = {
        el: {
            signIn: "Σύνδεση",
            password: "Κωδικός",
            email: "Διεύθυνση Ηλεκτρονικού Ταχυδρομείου",
            signUp: "Εγγραφή",
            user: "Χρήστες",
            username: "Όνομα χρήστη",
            male: "Άνδρας",
            female: "Γυναίκα",
            other: "Άλλο",
            birthDay: "Ημέρα γέννησης",
            userInfo: "Πληροφορίες χρηστών",
            gender: "Φύλο",
            deleted: "Διαγραφή",
            edit: "Επεξεργασία",
            deleteMsg: "Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον χρήστη;",
            save: "Αποθήκευση",
            cancel: "Ακύρωση",
            rows: "γραμμές",
            of: "από",
            search: "Αναζήτηση",
            actions: "Λειτουργίες",
            nextPage: "Επόμενη Σελίδα",
            previousPage: "Προηγούμενη Σελίδα",
            lastPage: "Τελευταία Σελίδα",
            firstPage: "Πρώτη Σελίδα",
            displayUser: "Δεν υπάρχουν χρήστες για εμφάνιση",
            export: "Εξαγωγή",
            selectLang: "Επιλέξτε Γλώσσα",
            fillAll: "Συμπληρώστε όλα τα πεδία!",
            invalidEmail: "Μη έγκυρη διεύθυνση e-mail.",
            passLetters: "Ο κωδικός πρόσβασης πρέπει να αποτελείται από 8 έως 16 γράμματα",
            updateSuc: "Η ενημέρωση ήταν επιτυχής!!",
            notUpdateSuc:"Η ενημέρωση δεν ήταν επιτυχής",
            deletedSuc:"Διαγράφηκε με επιτυχία!!",
            notDeletedSuc:"Δεν διαγράφηκε με επιτυχία",
            signInSuc:"Συνδεθήκατε με επιτυχία!!",
            signUpSuc: "Γραφτήκατε με επιτυχία"
        },
        en: {
            signIn: "Sign In",
            password: "Password",
            email: "Email Address",
            signUp: "Sign Up",
            user: "Users",
            username: "Username",
            male: "Male",
            female: "Female",
            other: "Other",
            birthDay: "Birth Day",
            userInfo: "User Information",
            gender: "Gender",
            deleted: "Deleted",
            edit: "Edit",
            deleteMsg: "Are you sure you want to delete this user?",
            save: "Save",
            cancel: "Cancel",
            rows: "rows",
            of: "of",
            search: "Search",
            actions: "Actions",
            nextPage: "Next Page",
            previousPage: "Previous Page",
            lastPage: "Last Page",
            firstPage: "First Page",
            displayUser: "No users to display",
            export: "Export",
            selectLang: "Select Language",
            fillAll: "Please fill all inputs!",
            invalidEmail: "Invalid email address.",
            passLetters: "Password must be from 8 to 16 letters",
            updateSuc: "Update Successful!!",
            notUpdateSuc:"Not update successful",
            deletedSuc:"Deleted successful!!",
            notDeletedSuc:"Not deleted successful",
            signInSuc:"Signed in successfully!!",
            signUpSuc:"Signed up successfully!!",

        }
    }
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
