/* eslint-disable react/prop-types */
import React from 'react';

const ItemCardshort = ({category}) => {
//    console.log(category);
    const {  item_name, subcategory_Name, price, image, rating, customization, shortDescription, stockStatus, processing_time } = category;
   
    return (
        
            <div className="flex flex-col lg:w-2/3 lg:flex-row w-full rounded-xl my-10">
            <div className="w-full lg:w-1/2" >
                <img className='w-full h-full' src={image} alt="image" />
            </div>
            <div className="w-full lg:h-1/2 lg:w-1/2 flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{item_name}</h1>
                <p className="font-bold text-xl">{shortDescription}</p>
                    <span className="font-bold text-base flex flex-column gap-3">Rating: {rating}</span>
                    <span className="font-bold text-base flex flex-column gap-3">{subcategory_Name}</span>
                    <span className="font-bold text-base flex flex-column gap-3">Price: ${price}</span>
                    <span className="font-bold text-base flex flex-column gap-3">Customization: {customization}</span>
                    <span className="font-bold text-base flex flex-column gap-3">Processing Time:{processing_time}</span>
                <h4 className="font-bold text-xl flex flex-row gap-3">
                    <span>{stockStatus} </span>
                </h4>
              
            </div>
       
        </div>
    );
};

export default ItemCardshort;