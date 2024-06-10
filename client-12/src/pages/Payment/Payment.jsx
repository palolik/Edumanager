import  {useEffect, useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import {  Link, useLoaderData, useNavigate } from "react-router-dom";

const Payment = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
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
    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleAddPost = (event) => {
        event.preventDefault();
    
        const form = event.target;
        const title = form.title?.value || '';
        const price = form.price?.value || '';
        const description = form.description?.value || '';
        const userEmail = form.userEmail?.value || '';
 
        const cardNumber = paymentData.cardNumber || '';
        const cardHolder = paymentData.cardHolder || '';
        const expiryDate = paymentData.expiryDate || '';
        const cvv = paymentData.cvv || '';
    
        const postData = {
            title: title,
            price: price,
            description: description,
            userEmail: userEmail,

            cardNumber: cardNumber,
            cardHolder: cardHolder,
            expiryDate: expiryDate,
            cvv: cvv,
        };
    
        fetch('http://localhost:5000/payment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    title: "New Post Added!",
                    text: "You have successfully added a new Post",
                    icon: "success"
                });
                form.reset();
            }
          navigate(`/myenrollments/${user.uid}`)
        });
    };
    
    const place = useLoaderData();
    const navigate = useNavigate();
    const { _id, title,description,price } = place;

    if (!place) {
        navigate('/posts');
    }
    return (
        <div className="flex flex-col items-center w-1/3">
            <h1 className="font-black text-3xl shadow-2xl  p-5  w-full text-center text-black">Add Payment Details</h1>
            <form onSubmit={handleAddPost} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
                <div className="flex flex-col  gap-3 h-full">
                    <div className="flex flex-col gap-2 w-full">
                        
                      
                        <label className="input input-bordered flex items-center gap-2">
                            Title
                            <input type="text" name="title" className="grow" placeholder="Title" defaultValue={title} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Price
                            <input type="text" name="price" className="grow" placeholder="Price" defaultValue={price}/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Description
                            <input type="text" name="description" className="grow" placeholder="Description" defaultValue={description} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                           class id
                            <input type="text" name="classid" className="grow" placeholder="id" defaultValue={_id} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2" >
                            Email
                            <input type="email" name="userEmail" className="grow" defaultValue={user.email ? user.email : ''} />
                        </label>
                      
                        <label className="input input-bordered flex items-center gap-2">
                            Card Number
                            <input type="text" name="cardNumber" className="grow" placeholder="Card Number" onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Card Holder
                            <input type="text" name="cardHolder" className="grow" placeholder="Card Holder" onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Expiry Date
                            <input type="text" name="expiryDate" className="grow" placeholder="Expiry Date (MM/YY)" onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            CVV
                            <input type="text" name="cvv" className="grow" placeholder="CVV" onChange={handleChange} />
                        </label>
                    </div>
                    <div className="flex flex-col gap-2 w-full h-full">
                        {/* Additional fields if needed */}
                    </div>
                </div>
                <div>
                    <input type="submit" value="Add New Post" className="btn bg-blue-500 text-white w-full" />
                </div>
            </form>
        </div>
    );
};

export default Payment;
