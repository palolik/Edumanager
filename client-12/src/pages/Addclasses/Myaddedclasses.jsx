/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { NavLink,Link } from 'react-router-dom';
import { useLocation, useNavigate, useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';

const Myaddedclasses = () => {
    useEffect(() => {
        document.title = "All My classes";
    }, []);

    const routeLocation = useLocation();
    const navigate = useNavigate();
    const loaderPosts = useLoaderData();
    const [posts, setPosts] = useState(loaderPosts);

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching classes:', error));
    }, []);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/delPost/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The post has been deleted.",
                                icon: "success"
                            }).then(() => {
                                // Remove the deleted post from the state
                                setPosts(posts.filter(post => post._id !== _id));
                            });
                        }
                    })
                    .catch(error => console.error('Error deleting post:', error));
            }
        });
    }

    return (
        <div>
            <div className="flex flex-row">
            <div className="h-screen w-40 bg-base-200">
                    <NavLink to="/teacherprofile" className="btn btn-block bg-blue-200">Teachar profile</NavLink>
                    <NavLink to="/studentprofile" className="btn btn-block bg-blue-200">Student profile</NavLink>                  
                    <NavLink to="/myaddedclasses" className="btn btn-block bg-blue-400">My added classes</NavLink>
                    <NavLink to="/myenrolledstudents" className="btn btn-block bg-blue-200">My Enrolled students</NavLink>
                </div>
                <div className="flex flex-col gap-5 my-5">
                    <div className="flex flex-col gap-3 items-center mb-5">
                        <h1 className="font-bold text-6xl">My classes</h1>
                    </div>
                    <table className="">
                        <thead>
                            <tr>
                                <th className="text-lg">image</th>
                                <th className="text-lg">title</th>
                                <th className="text-lg">price</th>
                                <th className="text-lg">description</th>
                                <th className="text-lg">userEmail</th>
                                <th className="text-lg">userName</th>
                                <th className="text-lg">total enrolment</th>
                                <th className="text-lg">status</th>
                                <th className="text-lg">Action</th>
                                <th className="text-lg">See details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post._id}>
                                    <td><img src={post.image} alt='User' className='h-20 w-20 mr-2' /></td>
                                    <td>{post.title}</td>
                                    <td>{post.price}</td>
                                    <td className="w-96">{post.description}</td>
                                    <td>{post.userEmail}</td>
                                    <td>{post.userName}</td>
                                    <td>{post.totalenrolment}</td>
                                    <td>{post.status}</td>
                                    <td>
                                    <Link className="btn btn-xs bg-blue-300 text-black" to={`/update/${post._id}`}>Update</Link>
                                        <button onClick={() => handleDelete(post._id)} className="btn btn-xs btn-error">Delete</button>
                                    </td>
                                    <td><Link className="btn btn-xs bg-blue-300 text-black" to={`/dashboard/my-class/${post._id}`}>See Details</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Myaddedclasses;
