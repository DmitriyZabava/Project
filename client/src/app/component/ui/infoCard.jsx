import {useSelector} from "react-redux";
import {getDescriptions} from "../../store/descriptions";

function InfoCard() {
    const [descriptions] = useSelector(getDescriptions());
    return (
        <div className="flex flex-col text-xl text-gray-700 gap-2">
            <span>{descriptions.material}</span>
            <span>{descriptions.section}</span>
            <span>{descriptions.comfort}</span>
            <span>{descriptions.skeleton}</span>
            <span>{descriptions.install}</span>
            <hr/>
            <span>{descriptions.guarantee}</span>
            <hr/>
            <span>{descriptions.delivery}</span>
            <hr className=" border-solid border-stone-500"/>
            <span>{descriptions.safety}</span>
        </div>
    );
}

export default InfoCard;
