import React from "react";
import PropTypes from "prop-types";

function ButtonRemoveFromBasket({id, quantity, onRemove, className}) {
    return ( <>
        {quantity ?
            <p className="text-sm">{`В Корзине ${quantity}шт.`}</p> :
            null
        }
        <button
            onClick={() => onRemove(id)}
            className={className}
        >

            Убрать из корзины
        </button>
    </> );
}

ButtonRemoveFromBasket.propTypes = {
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number
};
export default ButtonRemoveFromBasket;