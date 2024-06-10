import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ItemCard = ({ post }) => {

    const { _id,image, item_name, subcategory_Name, loca_tion,shortDescription,no_volunteer,Dead_line } = post;

    // console.log(post);

    return (
        <div className="flex flex-col lg:flex-row lg:w-[500px] gap-5 p-5 shadow-lg m-5 rounded-xl">
            <div className="w-full lg:w-2/3 h-[300px]">
                <img className="w-full h-full" src={image} alt="image" />
            </div>
            <div className="w-full lg:h-1/2 lg: flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{item_name}</h1>
                <h4 className="font-semibold text-base flex flex-row gap-3">
                    <span>Category: {subcategory_Name}</span>
                </h4>
                <span className="font-semibold text-base flex flex-row gap-3">Location: {loca_tion}</span>
                <p className="font-bold text-base">{shortDescription}</p>
                <h4 className="font-semibold text-base flex flex-row gap-3">
                    <span className="font-semibold text-xl ">Number of Volunteer: {no_volunteer}</span>
                </h4>
                <span className="font-semibold text-xl ">Dead line: {Dead_line }</span>
                <Link to={`/post/${_id}`} className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-400 w-full">View Details</Link>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    post: PropTypes.object,
}

export default ItemCard;