import React from "react";
import PropTypes from "prop-types";

function ButtonIncrement({id, onIncrement}) {
    return (
        <button
            className="ml-5 text-2xl text-blue-800 font-extrabold"
            onClick={() => onIncrement(id)}
        >
            +
        </button>
    );
}

ButtonIncrement.propTypes = {
    id: PropTypes.string.isRequired,
    onIncrement: PropTypes.func.isRequired

};
export default ButtonIncrement;