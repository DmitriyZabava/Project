import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import priceWithDiscount from "../../../utils/priceWithDiscount";
import {emptyHeart, fillHeart, redBasket} from "../../common/svg/svg.icon";
import {
    addToFavorite,
    getUserBasket,
    getUserFavorite,
    getUserLoadingStatus,
    removeToFavorite
} from "../../../store/user";
import Loader from "../../common/Loader/loader";

function AutoModelsCard({
                            image,
                            price,
                            _id,
                            id,
                            brand,
                            title,
                            discount,
                            isAvailable,
                            ...rest
                        }) {

    const dispatch = useDispatch();
    const userLoadingUserStatus = useSelector(getUserLoadingStatus());

    const userFavorite = useSelector(getUserFavorite());

    const userBasket = useSelector(getUserBasket());
    const [favorite, setFavorite] = useState([]);
    const {discountMoney, newPrice} = priceWithDiscount(price, discount);


    useEffect(() => {
        setFavorite(userFavorite);
    }, []);


    if(userLoadingUserStatus) return <Loader/>;


    const modelInBasket = (modelId) => {
        const model = {
            modelId: {
                modelId,
                quantity: 1,
                cost: newPrice

            }
        };
    };
    const handleAddToFavorite = (modelId) => {
        console.log(modelId);
        setFavorite(prevState => [...prevState, modelId]);
        dispatch(addToFavorite(modelId)
        );
    };
    const handleRemoveToFavorite = (modelId) => {
        setFavorite(prevState => ( prevState.filter((item) => item !== modelId) ));
        dispatch(removeToFavorite(modelId));
    };
    const modelInFavorite = favorite.includes(_id);


    const handleAddBasket = () => {
    };
    return (
        <div className="p-2.5 w-60 mx-auto">
            <div
                className="p-5 border border-gray-200  border-solid
                transition-all duration-300
                hover:border-gray-400"
            >
                <p className="text-center pb-5 text-lime-700">
                    <span>В наличии {isAvailable} шт.</span>
                </p>
                <div className="relative items-center  h-2/4 transition-all ease-in duration-300 hover:scale-110">
                    <NavLink
                        to={`/${brand}/${id}`}
                        className=" block text-center "
                    >
                        <img
                            src={image}
                            alt="Изображение подлокотника"
                            className="h-36 mx-auto"
                        />
                    </NavLink>
                    <span className="absolute top-0 right-0 p-1 bg-red-600 rounded-l-lg text-slate-300 text-sm">
                        {discount}%
                    </span>
                </div>
                <div className="text-center pt-5 h-1/4">
                    <NavLink
                        to={`/${brand}/${id}`}
                        className="h-16 text-sm text-black uppercase  text-clip overflow-hidden hover: transition-all hover:bg-zinc-400 block"
                    >
                        {title}
                    </NavLink>

                    {modelInFavorite ?
                        <button
                            className=" px-1 flex text-xs items-center "
                            onClick={() => handleRemoveToFavorite(_id)}
                        >{fillHeart}</button> :
                        <button
                            className=" px-1 flex text-xs items-center "
                            onClick={() => handleAddToFavorite(_id)}
                        >{emptyHeart}</button>}

                    <p className="text-center text-2xl p-2">
                        <span className="imdiz-product__cost">
                            {newPrice} руб.
                        </span>
                    </p>
                </div>
                <div className=" flex text-center items-center mx-auto h-1/4">

                    <button className="w-40 bg-red-500 rounded  ml-0 mr-auto py-1 hover:bg-red-400"
                            onClick={() => handleAddBasket(_id)}>
                        Добавить в корзину
                    </button>
                    {redBasket}
                </div>
            </div>
        </div>
    );
}

AutoModelsCard.propTypes = {
    image: PropTypes.string,
    price: PropTypes.number,
    _id: PropTypes.string,
    id: PropTypes.string,
    brand: PropTypes.string,
    title: PropTypes.string,
    discount: PropTypes.number,
    isAvailable: PropTypes.number,
};

export default AutoModelsCard;
