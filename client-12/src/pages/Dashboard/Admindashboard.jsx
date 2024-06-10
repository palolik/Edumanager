import { useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const db = getFirestore();
            const colRef = collection(db, 'users');

            try {
                const querySnapshot = await getDocs(colRef);
                const fetchedData = [];
                querySnapshot.forEach((doc) => {
                    fetchedData.push(doc.data());
                });
                setTotalUsers(fetchedData.length);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();

        // Fetch data from MongoDB "classes" collection
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => {
                // Calculate the total number of classes
                const totalCount = data.length;
                setTotalClasses(totalCount);
            })
            .catch(error => console.error('Error fetching total classes:', error));

        // Fetch data from MongoDB "payment" collection
        fetch('http://localhost:5000/payment')
        .then(res => res.json())
        .then(data => {
            // Calculate the total number of payments
            const totalPaymentCount = data.length;
            setTotalPayments(totalPaymentCount);
    
            // Calculate total earnings
            const totalEarnings = data.reduce((total, payment) => total + parseInt(payment.price), 0);
            setTotalEarnings(totalEarnings);
        })
        .catch(error => console.error('Error fetching total payments:', error));
    
    }, []);

    return (
        <div>
            <div className="flex flex-row">
                <div className="h-screen w-40 bg-base-200">
                  
                    <NavLink to="/admindashboard" className="btn btn-block bg-blue-200">Admin Dashboard</NavLink>
                    <NavLink to="/teacherapproval" className="btn btn-block bg-blue-200">Teacher Request</NavLink>
                    <NavLink to="/classestable" className="btn btn-block bg-blue-200">All Classes</NavLink>
                    <NavLink to="/allusers" className="btn btn-block bg-blue-200">Users</NavLink>
                </div>
                <div className="flex w-full ">
                    <div className="stats shadow">
                        <div className="stat h-72 w-80">
                            <div className="stat-figure text-secondary"></div>
                            <div className="stat-title text-3xl">Total User</div>
                            <div className="stat-value text-8xl">{totalUsers}</div>
                        </div>
                        <div className="stat h-72 w-96">
                            <div className="stat-figure text-secondary"></div>
                            <div className="stat-title text-3xl">Total classes:</div>
                            <div className="stat-value text-8xl">{totalClasses}</div>
                        </div>
                        <div className="stat h-72 w-96">
                            <div className="stat-figure text-secondary"></div>
                            <div className="stat-title text-3xl">Total enrollment:</div>
                            <div className="stat-value text-8xl">{totalPayments}</div>
                        </div>
                        <div className="stat h-72 w-96">
                            <div className="stat-figure text-secondary"></div>
                            <div className="stat-title text-3xl">Total Earnings:</div>
                            <div className="stat-value text-8xl">${totalEarnings}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
