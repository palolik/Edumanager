import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const Classtable = () => {
    useEffect(() => {
        document.title = "All Volunteer Posts";
    }, []);

    const loaderPosts = useLoaderData();
    const [posts, setPosts] = useState(loaderPosts);

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    const handleApprove = (postId) => {
        fetch(`http://localhost:5000/allclassreq/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'approved' }), 
        })
        .then(response => {
            if (response.ok) {
                setPosts(posts.map(post => {
                    if (post._id === postId) {
                        return { ...post, status: 'approved' };
                    }
                    return post;
                }));
                console.log('Teacher request approved successfully');
            } else {
                console.error('Failed to approve teacher request');
            }
        })
        .catch(error => {
            console.error('Error approving teacher request:', error);
        });
    };
    
    const handleReject = (postId) => {
        fetch(`http://localhost:5000/allclassreq/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'rejected' }), 
        })
        .then(response => {
            if (response.ok) {
                
                setPosts(posts.map(post => {
                    if (post._id === postId) {
                        return { ...post, status: 'rejected' };
                    }
                    return post;
                }));
  
                console.log('Teacher request rejected successfully');
            } else {
                console.error('Failed to reject teacher request');
            }
        })
        .catch(error => {
            console.error('Error rejecting teacher request:', error);
        });
    };
    

    return (

        
        <div>
            <div className="flex flex-row">
            <div className="h-screen w-40 bg-base-200">
                  <NavLink to="/admindashboard" className="btn btn-block bg-blue-200">Admin Dashboard</NavLink>
                  <NavLink to="/teacherapproval" className="btn btn-block bg-blue-200">Teacher Request</NavLink>
                  <NavLink to="/classestable" className="btn btn-block bg-blue-400">All Classes</NavLink>
                  <NavLink to="/allusers" className="btn btn-block bg-blue-200">Users</NavLink>
              </div>
                <div className="flex flex-col gap-5 my-5 overflow-x-auto">
                    <div className="flex flex-col gap-3 items-center mb-5">
                        <h1 className="font-bold text-6xl">All classes</h1>
                    </div>
                    <table className="mx-10">
                        <thead>
                            <tr className="bg-blue-200">
                                <th className="text-lg">image</th>
                                <th className="text-lg">title</th>
                                <th className="text-lg">description</th>
                                <th className="text-lg">price</th>
                                <th className="text-lg">userEmail</th>
                                <th className="text-lg">userName</th>
                                <th className="text-lg">Status</th>
                                <th className="text-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post._id}>
                                    <td><img src={post.image} alt='User' className='h-20 w-20 mr-2' /></td>
                                    <td>{post.title}</td>
                                    <td className="">{post.description}</td>
                                    <td>{post.price}</td>
                                    <td>{post.userEmail}</td>
                                    <td>{post.userName}</td>
                                    <td>{post.status}</td>
                                    <td>
                                        {post.status !== 'approved' && post.status !== 'rejected' && (
                                            <>
                                                <button onClick={() => handleApprove(post._id)} className="btn btn-primary mr-2" disabled={post.status === 'approved' || post.status === 'rejected'}>Approve</button>
                                                <button onClick={() => handleReject(post._id)} className="btn btn-danger" disabled={post.status === 'approved' || post.status === 'rejected'}>Reject</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Classtable;
