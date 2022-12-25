import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import BasketTable from "../../ui/Basket/BasketTable";
import {decrementModelFromBasket, getUserBasket, incrementModelToBasket, removeFromBasket} from "../../../store/user";
import {getModelsByIdForBasket} from "../../../store/autoModels";
import convertData from "../../../utils/convertDataForBasket";

function BasketPage() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const userBasket = useSelector(getUserBasket());

    useEffect(() => {
        setData(dispatch(getModelsByIdForBasket(userBasket)));

    }, []);

    const handleRemoveModelFromBasket = (modelId) => {
        dispatch(removeFromBasket(modelId));
        setData(prevState => prevState.filter((item) => item._id !== modelId));
    };

    const handleIncrement = (id) => {
        const updateData = data.map((model) => {
            if(model._id === id) {
                if(model.quantity < model.isAvailable) {
                    model.quantity += 1;
                }
            }
            return model;
        });
        setData(updateData);
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
        setData(updateData);
        const updateBasket = convertData(updateData);
        dispatch(decrementModelFromBasket(updateBasket));
    };

    return (
        <section className="px-2">
            <header className="mb-10 text-center">
                <div className="container">
                    <h1 className="text-3xl font-bold leading-tight">Корзина товаров</h1>
                </div>
            </header>
            <div className="section-cart__body">
                <div className="container">
                    <BasketTable
                        data={data}
                        onRemove={handleRemoveModelFromBasket}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}

                    />
                </div>
            </div>
            <hr className=" w-full border-solid border-stone-500"/>
            <div className="mt-8 py-5 px-12 flex gap-12 justify-center">
                <button>Оформить Заказ</button>
            </div>
        </section>
    );
}

export default BasketPage;
