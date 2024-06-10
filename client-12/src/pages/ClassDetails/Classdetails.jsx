/* eslint-disable no-undef */
import { useContext, useEffect } from "react";
import {  Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

const ClassDetails = () => {
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
               
                   { user ? (
                       <Link to={`/dashboard/payment/${_id}`} >
                       <button className="btn btn-primary">Pay</button>
                   </Link>
                    ) : (
                        <Link to="/login" className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-400 w-full">
                            login to Pay 
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default ClassDetails;
