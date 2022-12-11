import PropTypes from "prop-types";

import AutoModelsCard from "../AutoModelsCard";

function AutoModelsList({ autoModels }) {
    return (
        <div className='justify-end'>
            <ul className='flex flex-wrap'>
                {autoModels.map((model) => (
                    <AutoModelsCard key={model._id} {...model} />
                ))}
            </ul>
        </div>
    );
}

AutoModelsList.propTypes = {
    autoModels: PropTypes.array,
};

export default AutoModelsList;
