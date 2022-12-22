import BasketTable from "../../ui/Basket/BasketTable";
import {useSelector} from "react-redux";
import {getUserBasket} from "../../../store/user";
import {getAutoModelById} from "../../../store/autoModels";
import {useEffect, useState} from "react";

function BasketPage() {
    const [data, setData] = useState([]);
    const userBasket = useSelector(getUserBasket());
    const autoModel = useSelector(getAutoModelById("Lacetti"));
    useEffect(() => {
        setData([autoModel]);
    }, []);
    console.log(data);
    return (
        <section className="px-20">
            <header className="mb-10 text-center">
                <div className="container">
                    <h1 className="text-3xl font-bold leading-tight">Корзина товаров</h1>;
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
