import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Api_url from './Api_url';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Backimg from '../assets/bck.jpg';

import { Card, CardContent, Typography, Button } from '@mui/material';

export default function Home() {

    const [course, setCourse] = useState([]);
    const [isload, setIsload] = useState(0);
    const [addedCourses, setAddedCourses] = useState([]);
    const [pickedCourses_id, setPickedCourses_id] = useState([]);
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('userdata'));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access
    };
  

useEffect(() => {
    load_course()
},[]);

useEffect(() => {
        load_pickedCourses()
},[isload])

const load_pickedCourses = () => {

    axios.get(Api_url+"student/",{headers:headers})
    .then(res => {
        console.log(res.data);
       const course_ids = res.data.course_ids;
       const course_ids1 = course_ids.split(',');
       const picked_arr = [];
       setPickedCourses_id(course_ids1)
       course_ids1.map((item) => {
          const found_item = course.find(course => course.course_id == Number(item));
          if (found_item) {
            picked_arr.push(found_item);
          }
       });
    setAddedCourses(picked_arr);
    })
    .catch(err => {
        console.log(err);
    })
}

const load_course = () => { 
    axios.get(Api_url+"course/")
    .then(res => {
        console.log(res.data);
        setCourse(res.data);
        setIsload(isload+1);
    })
    .catch(err => {
        console.log(err);
    })
}

const add_courses = (value,method) => {
    if(method == "added"){
   const cours_already_added = addedCourses.filter(item => item.course_id == value.course_id);
        if(cours_already_added.length > 0){
            toast.error("Course already added");
            return;
        }
  //create functon the number to convert to string
  const convertToString = (num) => {
    return num.toString();
  }
  const updated_cours = pickedCourses_id;
  updated_cours.push(convertToString(value.course_id));
  const cours ={
    course_ids:updated_cours.join(','),
  }

  console.log(cours,"cours")
    axios.post(Api_url+"courseAdd/", cours,{headers:headers})
    .then((res) => {
      console.log(res.data.status);
      if (res.data.status == 2) {
            toast.success(res.data.message);
            setIsload(isload+1);
      }
    })
    .catch((err) => {
      const errorObj = err.response.data;
      Object.entries(errorObj).map(([key, value]) => {
        toast.error(value);
      });
    });

}
else if(method == "detete"){
alert("Are you sure you want to delete this course?");
const remove_old_ids = pickedCourses_id.filter(item => Number(item) !== value.course_id);

console.log(remove_old_ids,"remove_old_ids")
const cours ={
    course_ids:remove_old_ids.join(','),
  }

    axios.post(Api_url+"courseAdd/", cours,{headers:headers})
    .then((res) => {
      console.log(res.data.status);
      if (res.data.status == 2) {
            toast.success("Course Deleted");
            setIsload(isload+1);
      }
    })
    .catch((err) => {
      const errorObj = err.response.data;
      Object.entries(errorObj).map(([key, value]) => {
        toast.error(value);
      });
    });
}

}
    
const UploadCourse = () => {
    navigate("/Upload");
}
const Logout = () => {
    localStorage.removeItem('userdata');
    navigate("/login");
}

  return (
    <Box sx={{ flexGrow: 1 ,   backgroundImage: `url(${Backimg})`,}}
     
    >
         <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: 'end', margin : '50px' }}>
       
        {/* <Typography component="h1" variant="h5">
        Upload Course
     </Typography> */}
     <Button
     variant="contained"
     label="Upload"
     onClick ={()=>UploadCourse()}
     >
        Upload Cours
     </Button>

     <Button
     variant="contained"
     label="Upload"
     sx={{marginLeft:'50px'}}
     onClick ={()=>Logout()}
     >
      Log Out
     </Button>
        </Grid>
    
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
       
        <Typography component="h1" variant="h5">
        Courses
     </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          {course.map((item) => (
        <Card key={item.course_id} sx={{ maxWidth: 400, width: '100%', p: 2, bgcolor: 'background.paper', boxShadow: 3 ,margin:'50px' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                {item.name}
              </Typography>
              <img src={item.image} alt={item.name} width="200" height="200" />
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.price}
              </Typography>
              <Button
                // component={Link}
                // to={`/course/${item.course_id}`}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick ={()=>add_courses(item,"added")}
              >
                Add
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

          
        </Grid>
      </Grid>


      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
       
        <Typography component="h1" variant="h5">
        My Courses
              </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          {addedCourses.map((item) => (
        <Card key={item.course_id} sx={{ maxWidth: 400, width: '100%', p: 2, bgcolor: 'background.paper', boxShadow: 3 ,margin:'50px' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                {item.name}
              </Typography>
              <img src={item.image} alt={item.name} width="200" height="200" />
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.price}
              </Typography>
              <Button
                // component={Link}
                // to={`/course/${item.course_id}`}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick ={()=>add_courses(item,"detete")}
              >
                delete 
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

          
        </Grid>
      </Grid>
    </Box>
  );
}
