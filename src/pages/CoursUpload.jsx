
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

import axios from 'axios';
import Api_url from './Api_url';
import { useNavigate } from 'react-router-dom';
import Backimg from '../assets/bck.jpg';
import toast, { Toaster } from 'react-hot-toast';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function CoursUpload() {
    // {
    //     "name":"Python",
    //      "description":"Whether you’re seeking a career in Machine Learning or Data Science or Website Development – the knowledge of Python Language is very much relevant in all these domains.",
    //      "price":100,
    //      "image":"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210215160315/FREE-Python-Course-For-Beginners.png"
    //     }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('userdata'));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access
    };

    const valitadation = () => {
        if (name === "") {
            toast.error("Name is required");
            return false;
        } else if (description === "") {
            toast.error("Description is required");
            return false;
        } else if (price === "") {
            toast.error("Price is required");
            return false;
        } else if (image === "") {
            toast.error("Image is required");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valitadation()) {
            const requestBody = {
                "name": name,
                "description": description,
                "price": price,
                "image": image
            }
            axios.post(Api_url + "course/", requestBody, { headers: headers })
                .then(function (response) {
                    console.log(response);
                    if (response.data.status == 2) {
                        toast.success("Course Uploaded Successfully");
                        setTimeout(() => {
                            navigate("/Home");
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
                            Upload Course
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                        {/* // name */}
                        <TextField margin="normal" fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                        {/* // description */}
                        <TextField margin="normal" fullWidth name="description" label="Description" type="text" id="description" autoComplete="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        {/* // price */}
                        <TextField margin="normal" fullWidth name="price" label="Price" type="text" id="price" autoComplete="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        {/* // image */}
                        <TextField margin="normal" fullWidth name="image" label="Image" type="text" id="image" autoComplete="image" value={image} onChange={(e) => setImage(e.target.value)} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Upload
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default CoursUpload;