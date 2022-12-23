import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import BasketTable from "../../ui/Basket/BasketTable";
import {getUserBasket} from "../../../store/user";
import {getModelsById} from "../../../store/autoModels";


function BasketPage() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const userBasket = useSelector(getUserBasket());

    useEffect(() => {
        setData(dispatch(getModelsById(userBasket)));

    }, []);
    console.log("userBasket", userBasket);
    return (
        <section className="px-20">
            <header className="mb-10 text-center">
                <div className="container">
                    <h1 className="text-3xl font-bold leading-tight">Корзина товаров</h1>
                </div>
            </header>
            <div className="section-cart__body">
                <div className="container">
                    <BasketTable data={data}/>
                </div>
            </div>
        </section>
    );
}

export default BasketPage;
