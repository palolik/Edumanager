import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const ItemTable = ({ post, index }) => {
    const routeLocation = useLocation();
    const navigate = useNavigate();

    const { _id,image, item_name, subcategory_Name, loca_tion,shortDescription,no_volunteer,Dead_line  } = post;

    // console.log(location);

    const handleDelete = (_id) => {
        // console.log(_id);
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

                fetch(`https://a11-server-sigma.vercel.app/delPost/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The post has been deleted.",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // navigate('/posts')
                                    navigate(routeLocation?.pathname ? routeLocation.pathname : '/posts')
                                }
                            });

                        }
                    })
            }
        });

    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td><img src={image} alt='User' className=' mr-2' /></td>
            <td>{item_name}</td>
            <td>{subcategory_Name}</td>
            <td>{loca_tion}</td>
            <td>{shortDescription}</td>
            <td>{no_volunteer}</td>
            <td>{Dead_line}</td>
            
            <td>
              
                <Link className="btn btn-xs bg-blue-300 text-black" to={`/update/${_id}`}>Update</Link>
            </td>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-xs btn-error">Delete</button>
            </td>
        </tr>
    );
};


ItemTable.propTypes = {
    post: PropTypes.object,
    index: PropTypes.number,
}

export default ItemTable;