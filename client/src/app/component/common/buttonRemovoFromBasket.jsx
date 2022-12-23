import React from "react";
import PropTypes from "prop-types";

function ButtonRemoveFromBasket({id, handleRemoveModelFromBasket, quantity}) {
    return ( <div className="text-center items-center mx-auto h-1/4">
        {quantity ?
            <p className="text-sm">{`В Корзине ${quantity}шт.`}</p> :
            null
        }
        <button className="w-40 bg-red-400 rounded text-sm   m-auto py-1 hover:bg-red-300"
                onClick={() => handleRemoveModelFromBasket(id)}>
            Убрать из козины
        </button>
    </div> );
}

ButtonRemoveFromBasket.propTypes = {
    id: PropTypes.string.isRequired,
    handleRemoveModelFromBasket: PropTypes.func,
    quantity: PropTypes.number
};
export default ButtonRemoveFromBasket;