/* eslint-disable no-undef */
import { useContext, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/providers/AuthProvider";
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

const ItemDetails = () => {
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
    const { _id, image, item_name, subcategory_Name, loca_tion, shortDescription, no_volunteer, Dead_line } = place;

    if (!place) {
        navigate('/posts');
    }

    return (
        <div className="flex flex-col lg:flex-row w-full gap-5 p-5 shadow-lg m-10 rounded-xl">
            <div className="w-full lg:w-2/3 h-[300px]">
                <img className="w-full h-full" src={image} alt="image" />
            </div>
            <div className="w-full lg:h-1/2 lg: flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{item_name}</h1>
                <h4 className="font-semibold text-base flex flex-row gap-3">
                    <span>Category: {subcategory_Name}</span>
                </h4>
                <span className="font-semibold text-base flex flex-row gap-3">Location: {loca_tion}</span>
                <p className="font-bold text-base">{shortDescription}</p>
                <h4 className="font-semibold text-base flex flex-row gap-3">
                    <span className="font-semibold text-xl ">Number of Volunteer: {no_volunteer}</span>
                </h4>
                <span className="font-semibold text-xl ">Dead line: {Dead_line}</span>
                {no_volunteer === 0 ? (
                    <span className="text-red-500 font-semibold">No more volunteer needed</span>
                ) : (
                    user ? (
                        <Link  to={`/beavolunteer/${_id}`}  className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-400 w-full">
                            Be a Volunteer
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-400 w-full">
                            Be a Volunteer
                        </Link>
                    )
                )}
            </div>
        </div>
    );
};

export default ItemDetails;
