import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

const MyProfile = () => {
    const { user, logOut } = useContext(AuthContext);
    const [data, setData] = useState([]);

    const handleLogout = async () => {
        try {
            await logOut();
            // console.log('Logged out successfully');
        } catch (error) {
            // console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const db = getFirestore();
                const colRef = collection(db, 'users');
                const q = query(colRef, where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const fetchedData = [];
                querySnapshot.forEach((doc) => {
                    fetchedData.push(doc.data());
                });
                setData(fetchedData);
            }
        };

        fetchData();

        return () => setData([]);
    }, [user]);

    return (
        <div>
            {user ? (
                <div className='flex flex-row'>
                  
                    {data.length > 0 ? (
                        <div className="">  
                            {data.map((item) => (
                                <div key={item.uid} className="flex flex-col items-center">
                                     <div className="w-24 avatar mb-10">
                                        <img src={item.photoURL} alt='User' className='w-24 rounded-full mr-2' />
                                    </div>
                                    <label className="input input-bordered flex items-center gap-2 mb-2 w-80">
                                    Name
                                    <input type="text" className="grow" placeholder="Daisy" value={item.name} disabled/>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2  mb-2 w-80">
                                    Email
                                    <input type="text" className="grow" placeholder="Daisy" value={item.email} disabled />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2  mb-2 w-80">
                                    Phone
                                    <input type="text" className="grow" placeholder="Daisy" value={item.phone}disabled />
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2  mb-2 w-80">
                                    role
                                    <input type="text" className="grow" placeholder="Daisy" value={item.role}disabled />
                                    </label>
                                  
                                   
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            ) : (
                <>
                    
                </>
            )}
        </div>
    );
};

export default MyProfile;
