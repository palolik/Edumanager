import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";

const Updateclasses = () => {
   
    const classe = useLoaderData();

    const { _id, image, title, price, description, userEmail, userName } = classe;

    const handleUpdatePost = (event) => {
        event.preventDefault();

        const form = event.target;
        const updatedImage = form.image.value;
        const updatedTitle = form.title.value;
        const updatedPrice = form.price.value;
        const updatedDescription = form.description.value;
        const updatedUserEmail = form.userEmail.value;
        const updatedUserName = form.userName.value;

        const updatedPostData = {
            _id, image: updatedImage, title: updatedTitle, price: updatedPrice,
            description: updatedDescription, userEmail: updatedUserEmail, userName: updatedUserName
        };

        fetch(`http://localhost:5000/classes/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount > 0) {
                    Swal.fire({
                        title: 'Volunteer post updated',
                        text: 'Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            });
    }

    return (
        <div>
            <form onSubmit={handleUpdatePost} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
                <div className="flex flex-col lg:w-1/3 gap-3 h-full">
                    <h1 className="font-black text-3xl shadow-2xl p-5 w-full text-center text-black">Update Project</h1>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="input input-bordered flex items-center gap-2">
                            Image Url
                            <input type="text" name="image" className="grow" defaultValue={image} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Post Name
                            <input type="text" name="title" className="grow" defaultValue={title} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Price
                            <input type="text" name="price" className="grow" defaultValue={price} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Description
                            <input name="description" className="grow" defaultValue={description} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2" >
                            Email
                            <input type="email" name="userEmail" className="grow" defaultValue={userEmail} disabled />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            User name
                            <input type="text" name="userName" className="grow" defaultValue={userName} disabled />
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Update Post" className="btn btn-warning w-full" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Updateclasses;
