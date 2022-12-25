import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import Table from "../../common/Table";
import ButtonRemoveFromBasket from "../../common/buttonRemovoFromBasket";
import ButtonIncrement from "../../common/buttonIncrement";
import ButtonDecrement from "../../common/buttonDecrement";


function BasketTable({data, onRemove, onIncrement, onDecrement}) {

    const columns = {
        image: {
            path: "image",
            name: "",
            component: (autoModels) => (
                <img
                    className="w-[100px] h-[100px] "
                    src={autoModels.image}
                    alt="Изображение подлокотника"/>
            )
        },
        modelsName: {
            path: "name",
            name: "Модель",
            component: (autoModels) => (
                <Link
                    className="ml-5 text-xl font-bold "
                    to={`/${autoModels.brand}/${autoModels.model}`}
                >
                    {autoModels.name}
                </Link> )
        },
        isAvailable: {
            path: "isAvailable",
            name: "В наличии",
            component: (autoModels) => (
                <div
                    className="ml-5 text-2xl ">
                    {`${autoModels.isAvailable} шт.`}
                </div>
            )
        },
        buttonRemove: {
            name: "Убрать",
            component: (autoModels) => (
                <ButtonDecrement onDecrement={onDecrement} id={autoModels._id}/>
            )
        },

        quantity: {
            name: "Штук",
            component: (autoModels) => (
                <div
                    className="ml-5 text-2xl ">
                    {`${autoModels.quantity} шт.`}
                </div>
            )
        },
        buttonAdd: {
            name: "Добавить",
            component: (autoModels) => (
                <ButtonIncrement
                    onIncrement={onIncrement}
                    id={autoModels._id}
                />
            )
        },
        buttonFullRemove: {
            name: "Удалить из корзины",
            component: (autoModels) => (
                <ButtonRemoveFromBasket
                    onRemove={onRemove}
                    id={autoModels._id}
                    className="w-40 bg-red-400 rounded text-sm   m-auto py-1 hover:bg-red-300"
                />
            )
        },
        totalCost: {
            name: "Итого руб.",
            component: (autoModels) => (
                <div
                    className="ml-5 text-xl ">
                    {`${autoModels.cost * autoModels.quantity} руб.`}
                </div>
            )
        }

    };
    return ( <Table
        columns={columns}
        data={data}
    /> );

}

BasketTable.propTypes = {
    data: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired
};


export default BasketTable;