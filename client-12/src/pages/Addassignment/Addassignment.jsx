import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import { NavLink, useParams } from "react-router-dom"; // Import useParams to retrieve parameters from the URL

const Addassignment = () => {
    useEffect(() => {
        document.title = "Add New!"
    }, []);

    const { user } = useContext(AuthContext);
    const { id } = useParams(); // Retrieve class ID from the URL parameters
    console.log(user);

    const handleAddPost = (event) => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const deadline = form.deadline.value;
        const description = form.description.value;

        const postData = {
            title: title,
            deadline: deadline,
            description: description,
            classId: id // Include the class ID in the postData object
        };

        fetch('http://localhost:5000/addassignment', {
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
                console.log(data);
            });
    };

    return (
        <div>
            <div>
            <div className="flex flex-row">
                <div className="h-screen w-40 bg-base-200">
                    <NavLink to="/teacherprofile" className="btn btn-block bg-black">Teachar profile</NavLink>
                    <NavLink to="/studentprofile" className="btn btn-block bg-black">Student profile</NavLink>                  
                    <NavLink to="/myaddedclasses" className="btn btn-block bg-blue-200">My added classes</NavLink>
                    <NavLink className="btn btn-block bg-blue-200">My Enrolements</NavLink>
                </div>
                <div className="flex w-full justify-center items-center"> <div className="flex flex-col items-center w-1/3">
                <h1 className="font-black text-3xl   p-5  w-full text-center text-black">Add Assignment</h1>
                <form onSubmit={handleAddPost} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
                    <div className="flex flex-col  gap-3 h-full">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="input input-bordered flex items-center gap-2">
                                Title
                                <input type="text" name="title" className="grow" placeholder="enter title" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Deadline
                                <input type="text" name="deadline" className="grow" placeholder="deadline" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Assignment description
                                <input type="text" name="description" className="grow" placeholder="description" />
                            </label>
                        </div>
                        <div className="flex flex-col gap-2 w-full h-full">
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="Add Assignment" className="btn bg-blue-500 text-white w-full" />
                    </div>
                </form>
            </div></div>
            </div>
        </div>
           
        </div>
    );
};

export default Addassignment;
