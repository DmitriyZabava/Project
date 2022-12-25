import React from "react";
import PropTypes from "prop-types";

function ButtonAddToBasket({id, handleAddModelToBasket, className}) {

    return (
        <button
            className={className}
            onClick={() => handleAddModelToBasket(id)}>
            Добавить в корзину
        </button>
    );

}

ButtonAddToBasket.propTypes = {
    id: PropTypes.string.isRequired,
    handleAddModelToBasket: PropTypes.func.isRequired,
    className: PropTypes.string
};
export default ButtonAddToBasket;