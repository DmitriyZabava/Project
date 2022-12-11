import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function autoBrandList({
    autoBrand,
    onBrandSelect,
    selectedBrand,
    clearFilter,
}) {
    const notActive =
        "h-14 text-lg text-sky-900 px-5 border border-gray-200 hover:bg-slate-400 ";
    const active =
        "h-14 text-lg text-sky-900 px-5 border border-gray-300 bg-slate-300 ";

    return (
        <ul className='  '>
            <Link to='/'>
                <li className={notActive} role='button' onClick={clearFilter}>
                    Все модели
                </li>
            </Link>
            {autoBrand.map((brand) => {
                return (
                    <Link to={`/${brand.id}`} key={brand._id}>
                        <li
                            key={brand._id}
                            to={`/${brand.name}`}
                            role='button'
                            onClick={() => onBrandSelect(brand.id)}
                            className={
                                brand.id === selectedBrand ? active : notActive
                            }
                        >
                            {brand.name}
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
}

autoBrandList.propTypes = {
    autoBrand: PropTypes.array,
    onBrandSelect: PropTypes.func,
    selectedBrand: PropTypes.string,
    clearFilter: PropTypes.func,
};

export default autoBrandList;
