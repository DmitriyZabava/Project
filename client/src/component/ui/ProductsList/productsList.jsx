import {useSelector} from "react-redux";

// import {getProducts, getProductsLoadingStatus} from "../../../store/product";
import AutoModelsCard from "../ProductCard";
import {getAutoModels, getAutoModelsLoadStatus} from "../../../store/autoModels";

function ProductsList() {
    const autoModels = useSelector(getAutoModels());
    const autoModelsLoading = useSelector(getAutoModelsLoadStatus());
    console.log("AutoProductList", autoModels, autoModelsLoading);
    // const products = useSelector(getProducts());
    // const productLoading = useSelector(getProductsLoadingStatus());

    if(autoModelsLoading) {
        return "...Loading";
    } else {
        return (
            <div className="justify-end">
                <ul className="flex flex-wrap">
                    {autoModels.map((model) => (
                        <AutoModelsCard key={model._id} {...model} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default ProductsList;
