import React, {useState, Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {incode} from '../utils/utils';
import {
    RadioGroup,
    FormControl,
    Radio,
    Container,
    Typography,
    Grid,
    FormControlLabel,
    TextField,
    CssBaseline,
    Button,
    Avatar,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@material-ui/core";
import {Visibility, VisibilityOff, LockOutlined} from "@material-ui/icons";
import axios from 'axios';
import Alert from "./Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    pass: {
        width: "100%"
    }
}));

export default function SignUp(props) {
    const {fetchData, stringValues} = props;
    const classes = useStyles();
    const [error, setError] = useState({
        severity: "",
        message: '',
        flag: false,
        openAlert: false
    })
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        gender: '',
        bornday: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };
    const createNewUser = () => {
        const token = incode(values);

        axios.post('http://localhost:9000/user', {token}).then(() => {
            fetchData();
        }).catch((err) => {
            console.error(err);
        });
    }
    const handleSubmit = (e) => {
        let message;
        e.preventDefault();
        let errorFlag = false;
        for (let key in values) {
            if (key !== 'showPassword') {
                if (!values[key] && key !== 'gender') {
                    message =  stringValues.fillAll;
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
                    if (key === 'gender' && !values[key]) {
                        values[key] = 'male';
                    }
                    message = "";
                    errorFlag = false;
                }
            }
        }
        if (!errorFlag) createNewUser();
        if (!errorFlag) {
            setError({...error, flag: true});
        } else setError({...error, openAlert: true, message, severity: "error"})
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
                            {stringValues.signUp}
                        </Typography>
                        <form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label={stringValues.username}
                                        name="username"
                                        autoComplete="username"
                                        onChange={handleChange('username')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label={stringValues.email}
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange('email')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="date"
                                        id="date"
                                        label={stringValues.birthDay}
                                        name="birthday"
                                        locale='el'
                                        defaultValue={new Date().toISOString().slice(0,10)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange('bornday')}
                                    />
                                </Grid>
                                <FormControl component="fieldset" style={{padding: 10}}>
                                    <RadioGroup row aria-label="position" name="position"
                                                defaultValue="male" onChange={handleChange('gender')}>
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio color="primary"/>}
                                            label={stringValues.male}
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio color="primary"/>}
                                            label={stringValues.female}
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="other"
                                            control={<Radio color="primary"/>}
                                            label={stringValues.other}
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                {stringValues.signUp}
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
                    <h2>{stringValues.signUpSuc}</h2>
                </div>
            }

        </Fragment>
    );
}