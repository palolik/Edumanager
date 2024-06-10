import { useLoaderData } from "react-router-dom";
import ItemCardshort from "./itemCardshort";



const ItemDetailsCategory = () => {
    const categories = useLoaderData();
    // const [{  item_name, subcategory_Name, price, image, rating, customization, shortDescription, stockStatus, processing_time }] = category;
    return (
    
        <div className="w-full  flex flex-col justify-center">
           {
          categories.map(category => <ItemCardshort key={category._id} category={category}></ItemCardshort>)
      }
        </div>
    );
};

export default ItemDetailsCategory;