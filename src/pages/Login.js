import React, {useEffect, useState} from "react";
import {Container, CssBaseline, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useNavigate} from "react-router-dom";
import {ENDPOINT} from "../Constant/Constants";
import axios from "axios";
import SimpleCrypto from  'simple-crypto-js';

function Login() {
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [token,setToken] = useState('');

    const  encryptInit = new  SimpleCrypto('loginJWTTokenEncryption');

    useEffect(() => {
        if (token && token !== '') {
            navigate("/Dashboard");
        }
    },[token])

    useEffect(() => {
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded'
        };

        const data = {
            email: email,
            password: password
        }

        const  loginUrl = ENDPOINT + '/login';

        const config = {
            method: 'post',
            url: loginUrl,
            headers: headers,
            data: data
        }

        const loginUser = async () => {
            try {
                const result = await axios(config);
                const resultData = await result.data;
                const encryptedToken = encryptInit.encrypt(resultData.token);
                setToken(encryptedToken);
                localStorage.setItem('token', encryptedToken);
            }catch (error) {
                console.log('error: ',error);
                localStorage.setItem('token',  '');
                alert('Email or password invalid!!!');
            }
        };

        if (login){
            loginUser();
            setLogin(false);
        }

    },[login])

    const loginPage = (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form"
                         noValidate sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e =>  setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e =>  setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={e => {
                                e.preventDefault();
                                setLogin(true);
                            }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )

    return loginPage;
}

export default  Login;