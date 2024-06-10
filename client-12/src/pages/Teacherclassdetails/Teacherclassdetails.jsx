/* eslint-disable no-undef */

import { useContext, useEffect } from "react";
import {  NavLink,Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
const Teacherclassdetails = () => {

    const { user } = useContext(AuthContext);
    useEffect(() => {
        const unsubscribe = async () => {
            if (user) {
                const db = getFirestore();
                const colRef = collection(db, 'users');
                const q = query(colRef, where('uid', '==', user.uid)); // Filter by logged-in user's uid

                const querySnapshot = await getDocs(q);
                const fetchedData = [];
                querySnapshot.forEach((doc) => {
                    fetchedData.push(doc.data());
                });
                setData(fetchedData);
            }
        };

        unsubscribe();

        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        document.title = "Post Details"
    }, []);

    const place = useLoaderData();
    const navigate = useNavigate();
    const { _id, image, name,title,description,totalenrolment,price } = place;

    if (!place) {
        navigate('/posts');
    }
    return (
        <div className="flex flex-row">  <div className="h-screen w-40 bg-base-200">
        <NavLink to="/teacherprofile" className="btn btn-block bg-black">Teachar profile</NavLink>
        <NavLink to="/studentprofile" className="btn btn-block bg-black">Student profile</NavLink>                  
        <NavLink to="/myaddedclasses" className="btn btn-block bg-blue-200">My added classes</NavLink>
        {/* <NavLink className="btn btn-block bg-blue-200">My Enrolements</NavLink> */}
    </div>
    <div className="flex flex-col">
        <div className="flex flex-row  justify-between">
        <div className="w-96 h-40 bg-blue-100">
                <div className="stat ">
                    <div className="stat-title">Total Enrollment</div>
                    <div className="stat-value">1</div>
                </div> 
        </div>
        <div className="w-96 h-40 bg-blue-100">
                <div className="stat ">
                    <div className="stat-title">Total Assignment</div>
                    <div className="stat-value">12</div>
                </div> 
        </div>
        <div className="w-96 h-40 bg-blue-100">
                <div className="stat ">
                    <div className="stat-title">Per Day Assignment submitted</div>
                    <div className="stat-value">100</div>
                </div> 
        </div>

        </div>
        <div className="flex flex-col lg:flex-row gap-5  shadow-lg m-10 rounded-xl">
        <div className="w-full lg:w-2/3 h-[300px]">
            <img className="w-full h-full" src={image} alt="image" />
        </div>
        <div className="w-full lg:h-1/2 lg: flex flex-col gap-3">
            <h1 className="font-bold text-2xl">{title}</h1>
            <h4 className="font-semibold text-base flex flex-row gap-3">
                <span>Category: {name}</span>
            </h4>
  
            <p className="font-bold text-base">{description}</p>
            <h4 className="font-semibold text-base flex flex-row gap-3">
                <span className="font-semibold text-xl ">Price: {price}</span>
            </h4>
            <span className="font-semibold text-xl ">Total Enrolment: {totalenrolment}</span> 
            <Link  to={`/addassignment/${_id}`}  className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-400 w-full">
                        Add Assignment
                    </Link>
              
        </div>
        </div>
    
    
    </div>
    </div>
    );
};

export default Teacherclassdetails;