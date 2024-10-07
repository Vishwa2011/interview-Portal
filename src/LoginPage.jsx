import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Field, Form, Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
    const history = useHistory();

    const [initialValues, setinitialValues] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values) => {
        console.log(values.email);
        console.log(values.password);

        try {
            const data = await axios.post('https://interviewhub-3ro7.onrender.com/admin/login', values);
            console.log("==>==>" + data.data.token);
            localStorage.setItem('token', data.data.token);

            history.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', margin: '120px 0px' }}
        >
            <Box
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                    padding: '25px',
                    border: '2px solid rgb(25, 118, 210)',
                    borderRadius: '20px',
                    boxShadow: 'rgb(25, 118, 210) 0px 0px 5px'
                }}
                noValidate
                autoComplete="off"
            >
                <Formik
                    enableReinitialize
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    <Form>
                        <Box >
                            <h1
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                    margin: '0px',
                                    marginBottom: '20px',
                                    color: 'rgb(25, 118, 210)'
                                }}
                            >
                                Admin Panel
                            </h1>
                            <Field
                                as={TextField}
                                id="outlined-email-input"
                                label="Email"
                                variant="outlined"
                                type="email"
                                name='email'
                                sx={{ marginBottom: '15px', width: '300px' }}
                            />
                            <Field
                                as={TextField}
                                id="outlined-password-input"
                                label="Password"
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                sx={{ marginBottom: '10px', width: '300px' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Box
                                sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <Stack
                                    spacing={2}
                                    direction={"row"}
                                >
                                    <Button
                                        variant='contained'
                                        type="submit"
                                    >
                                        SUBMIT
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
}

export default LoginPage;
