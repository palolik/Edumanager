import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
const Addclasses = () => {
    useEffect(()=>{
        document.title = "Add New!"
    },[]);
    
    const { user } = useContext(AuthContext);
    console.log(user);
    const handleAddPost = (event) => {
        event.preventDefault();

        const form = event.target;
        const image = form.image.value;
        const title = form.title.value;
        const price = form.price.value;
        const description = form.description.value;
        const userEmail = form.userEmail.value;
        const userName = form.userName.value;

        const postData = {
            image: image,
            title: title,
            price: price,
            description: description,
            userEmail: userEmail,
            userName: userName,
            totalenrolment: 0,
            status: "pending",
        
        }

        fetch('http://localhost:5000/addclasses', {
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
            })
    }

    return (
        <div className="flex flex-col items-center w-1/3">
            <h1 className="font-black text-3xl shadow-2xl  p-5  w-full text-center text-black">List A New Class</h1>
            <form onSubmit={handleAddPost} className="p-6 w-full mx-auto rounded-xl shadow-md flex flex-col gap-5">
                <div className="flex flex-col  gap-3 h-full">
                    <div className="flex flex-col gap-2 w-full">
                    <label className="input input-bordered flex items-center gap-2" >
                          Email
                            <input type="email" name="userEmail" className="grow" defaultValue={user.email ? user.email : ''} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                             name
                            <input type="text" name="userName" className="grow" defaultValue={user.email ? user.displayName : ''} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Image
                            <input type="text" name="image" className="grow" placeholder="enter image url" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Title
                            <input type="text" name="title" className="grow" placeholder="Title" />
                        </label>             
                        <label className="input input-bordered flex items-center gap-2">
                            Price
                        <input type="text" name="price" className="grow" placeholder="description" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        description
                        <input type="text" name="description" className="grow" placeholder="description" />                    
                        </label>                      
                       </div>
                    <div className="flex flex-col gap-2 w-full h-full">                                          
                    </div>
                </div>
                <div>
                    <input type="submit" value="Add New Post" className="btn bg-blue-500 text-white w-full" />
                </div>
            </form>
        </div>
    );
};

export default Addclasses;
