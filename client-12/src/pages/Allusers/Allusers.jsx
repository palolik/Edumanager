import { useContext, useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { AuthContext } from "../../providers/AuthProvider";
import { NavLink } from 'react-router-dom';

const Allusers = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const db = getFirestore();
                const colRef = collection(db, 'users');

                try {
                    const querySnapshot = await getDocs(colRef);
                    const fetchedData = [];
                    querySnapshot.forEach((doc) => {
                        fetchedData.push(doc.data());
                    });
                    setUserData(fetchedData);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();

        return () => {}; // No cleanup needed for useEffect
    }, [user]);

    useEffect(() => {
        document.title = "All Users Data";
    }, []);

    return (
        <div className="flex flex-row">
              <div className="h-screen w-40 bg-base-200">
                  <NavLink to="/admindashboard" className="btn btn-block bg-blue-200">Admin Dashboard</NavLink>
                  <NavLink to="/teacherapproval" className="btn btn-block bg-blue-200">Teacher Request</NavLink>
                  <NavLink to="/classestable" className="btn btn-block bg-blue-200">All Classes</NavLink>
                  <NavLink to="/allusers" className="btn btn-block bg-blue-400">Users</NavLink>
              </div>
        <div className="flex w-full justify-center "><div>
            <h2 className="text-2xl font-bold mb-4">All Users Data</h2>
            <table className="">
                <thead>
                    <tr  className="bg-blue-200">
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>photoURL</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.uid}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td><img src={user.photoURL} className="w-20"></img></td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div></div>
    </div>
        
    );
};

export default Allusers;
