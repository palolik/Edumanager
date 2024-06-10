import PropTypes from 'prop-types';

const ItemCardCategory = ({category}) => {
// console.log(category);
    const {image, subcategory_name} = category;
    
    return (
        <div className="flex flex-col lg:w-[700px]  h-[320px] p-5 shadow-lg rounded-xl bg-blue-100 items-center">
                <img className='rounded-xl h-[250px] w-full' src={image} alt="image" />
                <h1 className='font-extrabold text-2xl'>{subcategory_name}</h1>
        </div>
    );
};

ItemCardCategory.propTypes = {
    category: PropTypes.object,
}

export default ItemCardCategory;