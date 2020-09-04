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
import {withRouter} from 'react-router-dom';
import {Formik} from 'formik';
import * as Yup from 'yup';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        paddingBottom: theme.spacing(20),
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
    const {stringValues, flag} = props;
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
    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, stringValues.passLetters)
            .max(19, stringValues.passLetters)
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
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
        } catch (err) {
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
                        <Formik
                            initialValues={{email: '', password: ''}}
                            validationSchema={SignupSchema}
                            onSubmit={(values, {setSubmitting}) => {
                                setTimeout(async() => {
                                    if(!(await verification(values.email,values.password))){
                                        setError({...error, flag: true});
                                    }else{
                                        setError({...error, openAlert: true, message:"Wrong email or password", severity: "error"});
                                    }
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                              }) => (
                                <form className={classes.form} onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        error={Boolean(errors.email && touched.email && errors.email)}
                                        fullWidth
                                        id="email"
                                        value={values.email}
                                        label={stringValues.email}
                                        name="email"
                                        helperText={errors.email && touched.email && errors.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FormControl required className={classes.pass} variant="outlined">
                                        <TextField
                                            id="password"
                                            variant="outlined"
                                            error={Boolean(errors.password && touched.password && errors.password)}
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange}
                                            label={stringValues.password}
                                            onBlur={handleBlur}
                                            helperText={errors.password && touched.password && errors.password}
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
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        type="submit" disabled={isSubmitting}
                                    >
                                        {stringValues.signIn}
                                    </Button>
                                </form>
                            )}
                        </Formik>
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