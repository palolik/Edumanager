import { useEffect, useState } from "react";
import { collection, getFirestore, getDocs } from 'firebase/firestore';

const Datashow = () => {
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

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
            })
            .catch(error => console.error('Error fetching total payments:', error));
    }, []);

    return (
        <section className="mb-12 flex flex-col items-center">
            <div className="mx-auto text-center md:w-4/12 my-8">
                <h3 className="text-5xl uppercase py-4">Overview of EduManage</h3>
            </div>
            <div className="gap-10 mx-20">
                <div className="stats shadow">
                    <div className="stat h-72 w-96">
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
                </div>
            </div>
        </section>
    );
};

export default Datashow;
