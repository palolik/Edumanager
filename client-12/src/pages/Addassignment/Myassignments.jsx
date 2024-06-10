/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';


const Myassignments = () => {
    const { user } = useContext(AuthContext);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    useEffect(() => {
        document.title = "Post Details";
    }, []);

    const handleAddPost = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const userEmail = user.email;
        const classId = form.classId.value;
        const deadline = form.deadline.value;
        const aid = form.aid.value;

        const postData = {
            title: title,
            deadline: deadline,
            description: description,
            classId: classId,
            aid: aid,
            userEmail: userEmail,
        };

        fetch('http://localhost:5000/submittedassignments', {
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
                    title: "Assignment Submitted!",
                    text: "You have successfully submitted the assignment",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: 'Submit Feedback',
                    cancelButtonText: 'Close',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setShowFeedbackForm(true);
                    }
                });
                // Reset the form after successful submission
                form.reset();
            }
            console.log(data);
        });
    };
    const handleFeedbackPost = (event) => {
        event.preventDefault();
    
        const form = event.target;
        const rating = form.rating.value;
        const feedback = form.feedback.value;
        const userEmail = user.email; // Rename the variable to avoid shadowing
    
        const postData = {
            rating: rating,
            feedback: feedback,
            userEmail: userEmail, // Corrected variable name
        };
    
        fetch('http://localhost:5000/feedback', {
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
                        title: "Feedback Added!",
                        text: "You have successfully added your feedback",
                        icon: "success"
                    });
                    form.reset();
                }
                console.log(data);
            });
    };
    

    const place = useLoaderData();
    const navigate = useNavigate();
    const { _id, title, deadline, description, classId } = place;

    if (!place) {
        navigate('/posts');
    }

    return (
        <div className="flex flex-col lg:flex-row gap-5 p-10 shadow-lg m-10 rounded-xl">
            <div className="w-full lg:h-1/2 lg: flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{title}</h1>
                <h4 className="font-semibold text-base flex flex-row gap-3">
                    <span>Deadline: {deadline}</span>
                </h4>
                <h4 className="font-semibold text-base flex flex-row gap-3">
                    <span>Description: {description}</span>
                </h4>
                <p>Class ID: {classId}</p>
                <form onSubmit={handleAddPost}>
                    <input type="hidden" name="userEmail" defaultValue={user.email} />
                    <input type="hidden" name="title" defaultValue={title} />
                    <input type="hidden" name="description" defaultValue={description} />
                    <input type="hidden" name="classId" defaultValue={classId} />
                    <input type="hidden" name="deadline" defaultValue={deadline} />
                    <input type="hidden" name="aid" defaultValue={_id} />
                    <button className="btn" type="submit">Submit Assignment</button>
                </form>
            </div>
            {showFeedbackForm && (
              <div className="w-full lg:h-1/2 lg:flex flex-col gap-3">
              <form onSubmit={handleFeedbackPost} className={` p-8 bg-white shadow-md rounded-xl`}>
                  <div className="form-group">
                      <label htmlFor="rating" className="text-lg font-bold">Rating:</label>
                      <input type="number" name="rating" id="rating" min="1" max="5" required className="input input-bordered" />
                  </div>
                  <div className="form-group">
                      <label htmlFor="feedback" className="text-lg font-bold">Feedback:</label>
                      <textarea name="feedback" id="feedback" rows="4" required className="textarea textarea-bordered"></textarea>
                  </div>
                  <button className="btn btn-primary" type="submit">Submit feedback</button>
              </form>
              <h2 className="text-2xl font-bold">Feedback Form</h2>
           
          </div>
            )}
        </div>
    );
};

export default Myassignments;
