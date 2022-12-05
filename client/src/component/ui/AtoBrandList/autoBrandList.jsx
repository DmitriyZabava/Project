import { Link } from "react-router-dom";

function autoBrandList({
    autoBrand,
    onBrandSelect,
    selectedBrand,
    clearFilter,
}) {
    const notActive =
        "h-14 text-lg text-sky-900 px-5 border border-gray-200 hover:bg-slate-200 ";
    const active =
        "h-14 text-lg text-sky-900 px-5 border border-gray-300 bg-slate-300 ";

    return (
        <ul className='  '>
            {autoBrand.map((brand) => {
                return (
                    <li
                        key={brand._id}
                        to={`/${brand.name}`}
                        role='button'
                        onClick={() => onBrandSelect(brand.id)}
                        className={
                            brand.id === selectedBrand ? active : notActive
                        }
                    >
                        <Link to={`/${brand.id}`}>{brand.name}</Link>
                    </li>
                );
            })}
            <li className={notActive} role='button' onClick={clearFilter}>
                <span>All Brands</span>
            </li>
        </ul>
    );
}

export default autoBrandList;
