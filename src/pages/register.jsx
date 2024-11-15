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
import axios from 'axios';
import Api_url from './Api_url';
import { useNavigate } from 'react-router-dom';

function register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [file, setFile] = useState('');

  const navigate = useNavigate();




  const valitadation = () => {
    if (name === "") {
      toast.error("Name is required");
      return false;
    } else if (email === "") {
      toast.error("Email is required");
      return false;
    } else if (!email.includes("@")) {
      toast.error("Invalid Email");
      return false;
    } else if (email.includes(" ")) {
      toast.error("Email cannot contain space");
      return false;
    } else if (password === "") {
      toast.error("Password is required");
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    } else if (phone === "") {
      toast.error("Phone is required");
      return false;
    } else if (phone.length < 10) {
      toast.error("Phone must be at least 10 characters long");
      return false;
    } else if (gender === "") {
      toast.error("Gender is required");
      return false;
    }
    return true;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (valitadation()) {
      const requestBody = {
        "user": 0,
        "name": name,
        "email": email,
        "password": password,
        "phone": phone,
        "gender": gender,
        "file": "null",
        "course_ids": "null"
      }

      axios.post(Api_url + "register/", requestBody)
        .then(function (response) {
          console.log(response);
          if (response.data.status === 200) {
            toast.success("Registration Successful");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        })
        .catch(function (error) {
          const errorObj = error.response.data;
          Object.entries(errorObj).map(([key, value]) => {
            toast.error(value);
          });


        });
    }

  };

  return (
    <Box
      sx={{
        minHeight: '100%',
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
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, bgcolor: 'background.paper', boxShadow: 3, marginTop: '50px', marginBottom: '100px' }}>
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
              Sign up
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            {/* // name */}
            <TextField margin="normal" fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
            {/* // email */}
            <TextField margin="normal" fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
            {/* // password */}
            <TextField margin="normal" fullWidth name="password" label="Password" type="text" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {/* // phone */}
            <TextField margin="normal" fullWidth name="phone" label="Phone" type="phone" id="phone" autoComplete="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {/* // gender */}
            <TextField margin="normal" fullWidth name="gender" label="Gender" type="gender" id="gender" autoComplete="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            {/* // file */}
            {/* <TextField margin="normal" fullWidth name="file" label="File" type="file" id="file" autoComplete="file" value={file} onChange={(e) => setFile(e.target.value)} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default register;
