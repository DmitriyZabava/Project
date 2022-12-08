import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OneModelPage from "../component/page/OneModelPage";
import ShowcasePage from "../component/page/ShowcasePage";
import { getAutoModelById } from "../store/autoModels";

const Showcase = () => {
    const { modelsId } = useParams();
    console.log(modelsId);
    const selectedAutoModel = useSelector(getAutoModelById(modelsId));

    if (modelsId) {
        return (
            <>{selectedAutoModel && <OneModelPage {...selectedAutoModel} />}</>
        );
    } else {
        return <ShowcasePage />;
    }
};

export default Showcase;
