/* eslint-disable no-undef */
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import Allclasses from "../pages/Allclasses/Allclasses";
import ClassDetails from "../pages/ClassDetails/Classdetails";
import Dashboard from "../pages/Dashboard/Dashboard";
import Instructor from "../pages/Home/BInstructor/Instructor";
import Admindashboard from "../pages/Dashboard/admindashboard";
import Teacherapp from "../pages/TeacherApp/Teacherapp";
import Teacherprofile from "../pages/Teacherprofile/Teacherprofile";
import Myaddedclasses from "../pages/Addclasses/Myaddedclasses";
import Updateclasses from "../pages/Addclasses/Updateclasses";
import Classtable from "../pages/Addclasses/Classtable";
import Allusers from "../pages/allusers/Allusers";
import Teacherclassdetails from "../pages/Teacherclassdetails/Teacherclassdetails";
import Addassignment from "../pages/Addassignment/Addassignment";
import Studentprofile from "../pages/Studentprofile/Studentprofile";
import Payment from "../pages/Payment/Payment";
import Myenrollments from "../pages/Myenrollment/Myenrollment";
import Myassignments from "../pages/Addassignment/Myassignments";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: '/allclasses',
          element: <Allclasses></Allclasses>
      },
      {
        path: '/classdetails/:cid',
        element: <ClassDetails></ClassDetails>
    },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'dashboard',
          element: <Dashboard></Dashboard>
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        },
        {
          path: 'becomeinstructor',
          element:<Instructor></Instructor>
        },
        {
          path: '/dashboard/payment/:id',
          element: <Payment></Payment>,
          loader: ({params})=> fetch(`http://localhost:5000/post/${params.id}`),
        },
        {
          path: 'admindashboard',
          element:<Admindashboard></Admindashboard>
        },
        {
          path: 'teacherapproval',
          element:<Teacherapp></Teacherapp>,
          loader: ()=> fetch('http://localhost:5000/allireq'),
        },
        {
          path: 'classestable',
          element:<Classtable></Classtable>,
          loader: ()=> fetch('http://localhost:5000/classes'),
        },
        {
          path: 'classestable/:id',
          element:<Classtable></Classtable>,
          loader: ({params})=> fetch(`http://localhost:5000/allclassreq/${params.id}`),
        },
        {
          path: 'teacherapproval/:id',
          element:<Teacherapp></Teacherapp>,
          loader:({params})=> fetch(`http://localhost:5000/allireq/${params.id}`),
        },
        {
          path: 'teacherprofile/',
          element:<Teacherprofile></Teacherprofile>,
      
        },
        {
          path: 'studentprofile/',
          element:<Studentprofile></Studentprofile>,
      
        },
        {
          path: 'myaddedclasses/',
          element:<Myaddedclasses></Myaddedclasses>,
          loader: ()=> fetch('http://localhost:5000/classes'),
         
        },
        {
          path: '/post/:id',
          element:<ClassDetails></ClassDetails>,
          loader: ({params})=> fetch(`http://localhost:5000/post/${params.id}`),
        },
      
        {
          path: '/update/:id',
          element: <Updateclasses></Updateclasses>,
           loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`),
        },
        {
          path: '/post/:id',
          element: <Updateclasses></Updateclasses>,
           loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`),
        },
        {
          path: '/allusers',
          element: <Allusers></Allusers>,
          
        },
        {
          path: 'dashboard/my-class/:id',
          element: <Teacherclassdetails></Teacherclassdetails>,
          loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`),
        },
        {
          path: '/addassignment/:id',
          element: <Addassignment></Addassignment>,
          loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`),
        },
        {
          path: '/assignments/:title',
          element: <Myassignments></Myassignments>,
          loader: ({params}) => fetch(`http://localhost:5000/assignments/${params.title}`),
        },
        {
          path: '/myenrollments',
          element: <Myenrollments></Myenrollments>,
          loader: ()=> fetch('http://localhost:5000/assignments'),
        },
        
      ]
    },
  ]);

