import {useSelector} from "react-redux";


import AutoModelsCard from "../ProductCard";
import {getAutoModels, getAutoModelsLoadStatus} from "../../../store/autoModels";
import Loader from "../../common/Loader";

function ProductsList() {
    const autoModels = useSelector(getAutoModels());
    const autoModelsLoading = useSelector(getAutoModelsLoadStatus());

    if(autoModelsLoading) {
        return ( <div className="loader flex justify-center mt-20">
            <Loader/>
        </div> )
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
