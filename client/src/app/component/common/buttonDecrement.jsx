import React from "react";
import PropTypes from "prop-types";

function ButtonDecrement({id, onDecrement}) {
    return (
        <button
            className="ml-5 text-3xl text-red-700 font-extrabold"
            onClick={() => onDecrement(id)}
        >
            -
        </button>
    );
}

ButtonDecrement.propTypes = {
    id: PropTypes.string.isRequired,
    onDecrement: PropTypes.func.isRequired

};
export default ButtonDecrement;