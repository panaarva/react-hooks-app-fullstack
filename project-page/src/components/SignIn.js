import React, {Fragment, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    IconButton,
    Container,
    Typography,
    TextField,
    CssBaseline,
    Button,
    Avatar
} from '@material-ui/core';
import {Visibility, VisibilityOff, LockOutlined} from '@material-ui/icons';
import axios from 'axios';
import {encode} from '../utils/utils';
import Alert from "./Alert";
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        paddingBottom:theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    pass: {
        width: "100%",
        margin: theme.spacing(1, 0, 0)
    },
    success: {
        backgroundColor: "green"
    }
}));

function SignIn(props) {
    const {stringValues,flag} = props;
    const classes = useStyles();
    const [error, setError] = useState({
        severity: "",
        message: '',
        flag: false,
        openAlert: false
    })
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let message;
        let errorFlag = false;
        for (let key in values) {
            if (key !== 'showPassword') {
                if (!values[key]) {
                    message = stringValues.fillAll;
                    errorFlag = true;
                    break;
                } else {
                    if (key === 'email') {
                        const emailRegexp = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
                        if (!emailRegexp.test(values[key])) {
                            message = stringValues.invalidEmail;
                            errorFlag = true;
                            break;
                        }
                    }
                    if (key === 'password') {
                        if (values[key].length < 8 || values[key].length > 16) {
                            message = stringValues.passLetters;
                            errorFlag = true;
                            break;
                        }
                    }
                    message = "";
                    errorFlag = false;
                }
            }
        }
        if (!errorFlag) {
            errorFlag = await verification(values.email, values.password);
            (errorFlag) ? message = "Wrong email or password" : message = '';
        }
        if (!errorFlag) {
            setError({...error, flag: true});
            props.history.push(`/${flag}/success/signin`);
        } else setError({...error, openAlert: true, message, severity: "error"});
    }
    const verification = async (email, password) => {
        let verificationErr = false;
        const token = encode({
            email,
            password
        });
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        try {
            await axios.get(`/user/signIn`, {headers});
        }catch (err){
            if (String(err).indexOf('Request failed with status code 404') !== -1) {
                verificationErr = true;
            }
        }
        return verificationErr;
    }
    return (
        <Fragment>
            {(!error.flag) ?
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlined/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {stringValues.signIn}
                        </Typography>
                        <form className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={stringValues.email}
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange('email')}
                            />
                            <FormControl required className={classes.pass} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">{stringValues.password}</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    variant="outlined"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                {stringValues.signIn}
                            </Button>
                        </form>
                    </div>
                    <Alert alert={error} setAlert={setError}/>
                </Container> :
                <div className={classes.paper}>
                    <CssBaseline/>
                    <svg fill="green" xmlns="http://www.w3.org/2000/svg" width="350" height="350" viewBox="0 0 24 24">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <h2>{stringValues.signInSuc}</h2>
                </div>
            }
        </Fragment>
    );
}

export default withRouter(SignIn)