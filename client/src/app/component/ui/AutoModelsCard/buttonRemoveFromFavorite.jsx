import React from "react";
import PropTypes from "prop-types";

import {fillHeart} from "../../common/svg/svg.icon";

function ButtonRemoveFromFavorite({id, handleRemoveFromFavorite}) {
    return ( <div className=" items-center">
        <button className="mx-auto  p-1"
                onClick={() => handleRemoveFromFavorite(id)}>
            {fillHeart}
        </button>

    </div> );
}

ButtonRemoveFromFavorite.propTypes = {
    id: PropTypes.string.isRequired,
    handleRemoveFromFavorite: PropTypes.func.isRequired
};
export default ButtonRemoveFromFavorite;