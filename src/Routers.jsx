import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import CoursUpload from './pages/CoursUpload';
import Auth from './Auth';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* //private routers  */}
                <Route path="/" element={<Auth><Home /></Auth>} />
                <Route path="/Home" element={<Auth><Home /></Auth>} />
                <Route path="/Upload" element={<Auth><CoursUpload /></Auth>} />

                {/* //public routers  */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>

        </BrowserRouter>
    );
};

export default Routers;