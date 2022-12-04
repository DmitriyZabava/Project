import {useSelector} from "react-redux";
import {getaAtoBrand, getAutoBrandLoadStatus} from "../../../store/autoBrand";

function autoBrandList() {
    const autoBrand = useSelector(getaAtoBrand());
    const autoBrandLoading = useSelector( getAutoBrandLoadStatus() );


    if(autoBrandLoading) {
        return "...Loading";

    } else {
        return (
            <ul className="  ">
                {autoBrand.map((brand) => {
                    return (
                        <li
                            key={brand._id}
                            className="catalog__item h-14 text-sm px-5 border-solid"
                            role="button"
                        >
                            <span> {brand.name} </span>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default autoBrandList;
