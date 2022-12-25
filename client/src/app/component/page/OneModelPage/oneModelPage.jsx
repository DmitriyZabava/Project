import PropTypes from "prop-types";

import priceWithDiscount from "../../../utils/priceWithDiscount";
import InfoCard from "../../ui/infoCard";
import ButtonDecrement from "../../common/buttonDecrement";
import ButtonIncrement from "../../common/buttonIncrement";
import ButtonAddToBasket from "../../common/buttonAddToBasket";
import {useDispatch, useSelector} from "react-redux";
import {
    addToBasket,
    decrementModelFromBasket,
    getUserBasket,
    incrementModelToBasket,
    removeFromBasket
} from "../../../store/user";
import createModelObj from "../../../utils/createModel";
import React, {useEffect, useState} from "react";
import ButtonRemoveFromBasket from "../../common/buttonRemovoFromBasket";
import {getModelsByIdForBasket} from "../../../store/autoModels";
import convertData from "../../../utils/convertDataForBasket";
import {Link} from "react-router-dom";


function OneModelPage({
                          color,
                          discount,
                          isAvailable,
                          image,
                          name,
                          price,
                          size,
                          title,
                          _id,
                      }) {
    const {newPrice} = priceWithDiscount(price, discount);
    const dispatch = useDispatch();
    const userBasket = useSelector(getUserBasket());
    const [data, setData] = useState([]);
    const isBasket = data.find((i) => i._id === _id);

    useEffect(() => {
        setData(dispatch(getModelsByIdForBasket(userBasket)));
    }, [userBasket]);


    const handleIncrement = (id) => {
        const updateData = data.map((model) => {
            if(model._id === id) {
                if(model.quantity < model.isAvailable) {
                    model.quantity += 1;
                }
            }
            return model;
        });
        const updateBasket = convertData(updateData);
        dispatch(incrementModelToBasket(updateBasket));
    };
    const handleDecrement = (id) => {
        const updateData = data.map((model) => {
            if(model._id === id) {
                if(model.quantity > 1) {
                    model.quantity -= 1;
                }
            }
            return model;
        });
        const updateBasket = convertData(updateData);
        dispatch(decrementModelFromBasket(updateBasket));
    };

    const handleAddModelToBasket = (modelId) => {
        const model = createModelObj(modelId, newPrice);
        dispatch(addToBasket(model));
    };
    const handleRemoveModelFromBasket = (modelId) => {
        dispatch(removeFromBasket(modelId));
    };


    return (
        <>
            <h1 className="my-3 text-3xl font-bold">{title}</h1>
            <div className="product py-5 px-12 flex gap-12">
                <div className="left flex flex-1  gap-5  ">
                    <div className="images flex flex-1">
                        <img
                            className=" w-[500] h-72 object-cover cursor-pointer mb-2 "
                            src={image}
                            alt={name}
                        />
                    </div>

                </div>
                <div className="right flex flex-1 flex-col gap-5">
                    <h1 className=" text-xl font-semibold">{name}</h1>
                    <span className="price text-3xl font-medium text-red-800">
                        Цена со скидкой {discount}% - {newPrice} руб.
                    </span>
                    <p className=" text-lg font-light  text-justify line-through">
                        Цена без скидки {price} руб.
                    </p>
                    <div className="quantity flex items-center gap-3 justify-between">

                        <ButtonDecrement onDecrement={handleDecrement} id={_id}/>
                        {isBasket ? (
                            <div className="ml-3 text-xl font-bold"
                            >{isBasket.quantity}
                            </div>
                        ) : (
                            <div>__</div>
                        )}
                        <ButtonIncrement onIncrement={handleIncrement} id={_id}/>

                        <div>
                            {isBasket &&
                                <span className="ml-16 ">
                                {`Итого: ${isBasket.cost * isBasket.quantity} руб.`}
                            </span>}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        {isBasket ?
                            <ButtonRemoveFromBasket
                                className="w-44 py-2 pl-2 bg-red-600 text-white flex items-center content-center gap-3 cursor-pointer border-none font-medium"
                                onRemove={handleRemoveModelFromBasket}
                                id={_id}
                            /> :
                            <ButtonAddToBasket
                                className="w-44 py-2 pl-2 bg-sky-800 text-white flex items-center content-center gap-3 cursor-pointer border-none font-medium"
                                handleAddModelToBasket={handleAddModelToBasket}
                                id={_id}
                            />}
                        <Link className=" text-sm py-2 bg-blue-500 text-amber-200" to="/basket">Перейти в корзину</Link>


                    </div>
                    <hr className=" w-52 border-solid border-stone-500"/>
                    <div className="info flex flex-col gap-2 text-gray-700 text-xl">
                        <span>{`Вналичии: ${isAvailable} шт.`}</span>
                        <span>{color}</span>
                        <span>{size}</span>
                    </div>

                    <InfoCard/>
                </div>
            </div>
        </>
    );

}

OneModelPage.propTypes = {
    brand: PropTypes.string,
    color: PropTypes.string,
    discount: PropTypes.number,
    image: PropTypes.string,
    isAvailable: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    size: PropTypes.string,
    title: PropTypes.string,
    _id: PropTypes.string,
    id: PropTypes.string,
};

export default OneModelPage;
