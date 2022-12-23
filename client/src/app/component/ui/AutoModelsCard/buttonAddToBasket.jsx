import React from "react";
import PropTypes from "prop-types";

function ButtonAddToBasket({id, handleAddModelToBasket}) {
    return ( <div className=" flex text-center items-center mx-auto h-1/4">
        <button className="w-40 bg-blue-600 rounded   m-auto py-1 hover:bg-blue-400"
                onClick={() => handleAddModelToBasket(id)}>
            Добавить в корзину
        </button>
    </div> );

}

ButtonAddToBasket.propTypes = {
    id: PropTypes.string.isRequired,
    handleAddModelToBasket: PropTypes.func.isRequired
};
export default ButtonAddToBasket;