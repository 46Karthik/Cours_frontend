// src/Login.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import toast, { Toaster } from 'react-hot-toast';
import Backimg from '../assets/bck.jpg';
import Api_url from './Api_url';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validatation = () => {
    if (name === "") {
      toast.error("Username is required");
      return false;
    } else if (password === "") {
      toast.error("Password is required");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatation()) {

      axios
        .post(Api_url + "api/token/", {

          username: name,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            toast.success("Login Successful");

            localStorage.setItem("userdata", JSON.stringify(res.data));

            setTimeout(() => {
              navigate("/Home");
            }, 2000);
          } else {
            toast.error("Login Failed");
          }
        })
        .catch((err) => {
          const errorObj = err.response.data;
          Object.entries(errorObj).map(([key, value]) => {
            toast.error(value);
          });
        });
    }

    // Add login logic here
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${Backimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, bgcolor: 'background.paper', boxShadow: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Username"
              type="text"
              id="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick ={()=>navigate("/register")}
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
