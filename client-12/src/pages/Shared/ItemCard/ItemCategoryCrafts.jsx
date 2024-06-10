

const ItemCategoryPosts = ({ post }) => {
    // eslint-disable-next-line react/prop-types
    const { average_cost, description, image, rating, customization, short_description, tourists_post_name } = post;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 shadow-2xl p-5 rounded-2xl">
            <img className="col-span-3 rounded-2xl shadow-orange-300" src={image} alt={tourists_post_name} />
            <div className="col-span-3">
                <h1 className="font-bold text-3xl py-5">{tourists_post_name}</h1>
                <h2 className="font-normal text-xs px-5">{short_description}</h2>
                <p className="font-normal text-base p-3">
                    {description}
                </p>
                <p className="font-bold text-lg flex justify-between">
                    
                    <span>Location: {rating}</span><br />
                    <span>Best Time: {customization}</span>
                    <span>Avg-Cost: {average_cost} /day</span>
                </p>
            </div>
        </div>
    );
};

export default ItemCategoryPosts;