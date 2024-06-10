import { useEffect, useState, useContext } from "react";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from "../../providers/AuthProvider";

const Myenrollments = () => {
    const { user } = useContext(AuthContext);
    useEffect(() => {
        document.title = "All My classes";
    }, []);

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6); // Set the number of posts per page

    useEffect(() => {
        fetch('http://localhost:5000/payment')
            .then(res => res.json())
            .then(data => {
                const filteredPosts = data.filter(post => post.userEmail === user.email);
                setPosts(filteredPosts);
            })
            .catch(error => console.error('Error fetching classes:', error));
    }, [user.email]);

    // Logic for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-row">
            <div className="h-screen w-40 bg-base-200">
                <NavLink to="/teacherprofile" className="btn btn-block bg-blue-200">Teacher profile</NavLink>
                <NavLink to="/dashboard" className="btn btn-block bg-blue-200">Student profile</NavLink>
                <NavLink className="btn btn-block bg-blue-400" to="/Myenrollments">My Enrollments</NavLink>
            </div>
            <div className="flex flex-col gap-5 my-5">
                <div className="flex flex-col gap-3 items-center mb-5">
                    <h1 className="font-bold text-6xl">My enrollments</h1>
                </div>
                {currentPosts.map(post => (
                    <div className="flex flex-col lg:flex-col  shadow-lg m-10 p-10 rounded-xl" key={post._id}>
                        <div className="font-bold">{post.title}</div>
                        <div>{post.price}</div>
                        <div className="w-96">{post.description}</div>
                        <div>{post.userEmail}</div>
                        <div>{post.cid}</div>
                        <div>
                            <NavLink className="btn" to={`/assignments/${post.cid}`}>Continue </NavLink>
                        </div>
                    </div>
                ))}
                <nav className="pagination flex justify-center my-4">
                    <ul className="pagination-list">
                        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`btn btn-sm btn-outline ${currentPage === index + 1 ? 'btn-active' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Myenrollments;
