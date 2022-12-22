import {Link} from "react-router-dom";
import Table from "../../common/Table";


function BasketTable({data}) {


    const columns = {
        image: {
            path: "image",
            name: "",
            component: (autoModels) => ( <img src={autoModels.image} alt="Изображение подлокотника"/> )
        },
        modelsName: {
            path: "name",
            name: "Наименование Модели",
            component: (autoModels) => ( <Link to={`/${autoModels.brand}/${autoModels.id}`}>{autoModels.name}</Link> )
        },
        buttonAdd: {
            name: "Добавить",
            component: <button>+</button>
        },
        quantity: {
            name: "Штук",
            component: <div></div>
        },
        buttonRemove: {
            name: "Убрать",
            component: <button>-</button>
        },
        buttonFullRemove: {
            name: "Удалить из корзины",
            component: <button>Удалить из корзины</button>
        }

    };

    return ( <Table
        columns={columns}
        data={data}/> );

}


export default BasketTable;