import {Link} from "react-router-dom";
import Table from "../../common/Table";
import ButtonRemoveFromBasket from "../../common/buttonRemovoFromBasket";


function BasketTable({data}) {


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
            name: "Наименование Модели",
            component: (autoModels) => (
                <Link
                    className="ml-2"
                    to={`/${autoModels.brand}/${autoModels.id}`}
                >
                    {autoModels.name}
                </Link> )
        },
        buttonAdd: {
            name: "Добавить",
            component: <button
                className="ml-2 text-2xl text-blue-800"
            >
                +
            </button>
        },
        quantity: {
            name: "Штук",
            component: <div></div>
        },
        buttonRemove: {
            name: "Убрать",
            component: <button
                className="ml-2 text-3xl text-red-700"
            >
                -
            </button>
        },
        buttonFullRemove: {
            name: "Удалить из корзины",
            component: (autoModels) => (
                <ButtonRemoveFromBasket
                    className="ml-2"
                    handleRemoveModelFromBasket={""}
                    id={autoModels._id}
                />
            )
        }

    };

    return ( <Table
        columns={columns}
        data={data}/> );

}


export default BasketTable;