import React from "react";
import PropTypes from "prop-types";

import {emptyHeart} from "../../common/svg/svg.icon";

function ButtonAddToFavorite({id, handleAddToFavorite}) {
    return ( <div className=" items-center">
        <button className="mx-auto  p-1"
                onClick={() => handleAddToFavorite(id)}>
            {emptyHeart}
        </button>

    </div> );
}

ButtonAddToFavorite.propTypes = {
    id: PropTypes.string.isRequired,
    handleAddToFavorite: PropTypes.func.isRequired
};
export default ButtonAddToFavorite;