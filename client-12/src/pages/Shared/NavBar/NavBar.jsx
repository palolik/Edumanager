import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const db = getFirestore();
                const colRef = collection(db, 'users');
                const q = query(colRef, where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const fetchedData = [];
                querySnapshot.forEach((doc) => {
                    fetchedData.push(doc.data());
                });
                setUserData(fetchedData);
            }
        };

        fetchUserData();

        return () => {};
    }, [user]);

    return (
        <div className="navbar z-10 bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <NavigationLinks userData={userData} user={user} handleLogout={handleLogout} />
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">EduManager</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <NavigationLinks userData={userData} user={user} handleLogout={handleLogout} />
                </ul>
            </div>
        </div>
    );
};

const NavigationLinks = ({ userData, user, handleLogout }) => {
    const isAdmin = userData.length > 0 && userData[0].role === 'admin';
    const isInstructor = userData.length > 0 && userData[0].role === 'Instructor';
    return (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allclasses">Our Classes</Link></li>

            {user ? (
                <div className='flex flex-row'>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    {isAdmin ? (
                        <li><NavLink to="/admindashboard">DashBoard</NavLink></li>
                    ) : (
                        <li><NavLink to="/dashboard">DashBoard</NavLink></li>
                    )}
                    {!isAdmin && isInstructor && (
                        <li><Link to="/becomeinstructor">Become An Instructor</Link></li>
                    )}
                    {userData.length > 0 ? (
                        <div className="">
                            {userData.map((item) => (
                                <div key={item.uid} className="flex flex-row items-center">
                                    <div className="mr-10">User: {item.name}</div>
                                    <div className="w-12 avatar "><img src={item.photoURL} alt='User' className='w-12 rounded-full mr-2' /></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading..</p>
                    )}
                </div>
            ) : (
                <>
                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                    <li><NavLink to="/login">Sign In</NavLink></li>
                </>
            )}
        </>
    );
};

export default NavBar;
