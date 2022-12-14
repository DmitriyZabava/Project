import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import priceWithDiscount from "../../../utils/priceWithDiscount";
import {
    addToBasket,
    addToFavorite,
    getUserBasket,
    getUserFavorite,
    getUserLoadingStatus,
    removeFromBasket,
    removeFromFavorite
} from "../../../store/user";
import Loader from "../../common/Loader";
import ButtonAddToBasket from "../../common/buttonAddToBasket";
import ButtonRemoveFromBasket from "../../common/buttonRemovoFromBasket";
import ButtonAddToFavorite from "./buttonAddToFavorite";
import ButtonRemoveFromFavorite from "./buttonRemoveFromFavorite";
import createModelObj from "../../../utils/createModel";

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
    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const userFavorite = useSelector(getUserFavorite());
    const userBasket = useSelector(getUserBasket());

    const [basketModels, setBasketModels] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const {newPrice} = priceWithDiscount(price, discount);


    useEffect(() => {
        setFavorite(userFavorite);
        setBasketModels(userBasket);
    }, []);


    if(userLoadingStatus) return <Loader/>;

    const handleAddToFavorite = (modelId) => {
        setFavorite(prevState => [...prevState, modelId]);
        dispatch(addToFavorite(modelId)
        );
    };
    const handleRemoveFromFavorite = (modelId) => {
        setFavorite(prevState => ( prevState.filter((item) => item !== modelId) ));
        dispatch(removeFromFavorite(modelId));
    };
    const modelInFavorite = favorite.includes(_id);
    const modelInBasket = basketModels.find((model) => model.modelId === _id);


    const handleAddModelToBasket = (modelId) => {
        const model = createModelObj(modelId, newPrice);
        setBasketModels(prevState => [...prevState, model]);
        dispatch(addToBasket(model));


    };
    const handleRemoveModelFromBasket = (modelId) => {
        dispatch(removeFromBasket(modelId));
        setBasketModels(prevState => prevState.filter((item) => item.modelId !== modelId));
    };
    return (
        <div className="h-[460px] p-2.5 w-60 mx-auto border border-gray-200  border-solid
                hover:border-gray-400">
            <div>
                <p className="text-center pb-5 text-lime-700">
                    <span>?? ?????????????? {isAvailable} ????.</span>
                </p>
                <div className="relative items-center  h-2/4 transition-all ease-in duration-300 hover:scale-110">
                    <NavLink
                        to={`/${brand}/${id}`}
                        className=" block text-center "
                    >
                        <img
                            src={image}
                            alt="?????????????????????? ????????????????????????"
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
                        className="h-16 text-sm text-black uppercase  text-clip overflow-hidden hover: transition-all hover:bg-zinc-300 block"
                    >
                        {title}
                    </NavLink>

                    {modelInFavorite ?
                        <ButtonRemoveFromFavorite
                            id={_id}
                            handleRemoveFromFavorite={handleRemoveFromFavorite}
                        />
                        :
                        <ButtonAddToFavorite
                            handleAddToFavorite={handleAddToFavorite}
                            id={_id}
                        />
                    }

                    <p className="text-center text-2xl p-2">
                        <span>
                            {newPrice} ??????.
                        </span>
                    </p>
                </div>
                {!modelInBasket ?
                    <div className=" flex text-center items-center mx-auto h-1/4">
                        <ButtonAddToBasket
                            id={_id}
                            className="w-40 bg-blue-600 rounded   m-auto py-1 hover:bg-blue-400"
                            handleAddModelToBasket={handleAddModelToBasket}
                        />
                    </div>
                    :
                    <div className="text-center items-center mx-auto h-1/4">
                        <ButtonRemoveFromBasket
                            onRemove={handleRemoveModelFromBasket}
                            quantity={modelInBasket.quantity}
                            id={_id}
                            className="w-40 bg-red-400 rounded text-sm   m-auto py-1 hover:bg-red-300"
                        />
                    </div>
                }
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
