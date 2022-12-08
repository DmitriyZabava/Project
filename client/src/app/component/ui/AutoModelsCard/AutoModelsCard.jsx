import { NavLink } from "react-router-dom";
import priceWithDiscount from "../../../utils/priceWithDiscount";

function AutoModelsCard({
    image,
    price,
    _id,
    id,
    brand,
    title,
    category,
    discount,
    isAvailable,
    ...rest
}) {
    const { discountMoney, newPrice } = priceWithDiscount(price, discount);

    return (
        <div className='p-2.5 w-60 mx-auto'>
            <div
                className='p-5 border border-gray-200  border-solid
                transition-all duration-300
                hover:border-gray-400'
            >
                <p className='text-center pb-5 text-lime-700'>
                    <span>В наличии {isAvailable} шт.</span>
                </p>
                <div className='relative items-center  h-2/4 transition-all  ease-in duration-300 hover:scale-110'>
                    <NavLink
                        to={`/${brand}/${id}`}
                        className=' block text-center '
                    >
                        <img
                            src={image}
                            alt='Изображение продукта'
                            className='h-36 mx-auto'
                        />
                    </NavLink>
                    <span className='absolute top-0 right-0 p-1 bg-red-600 rounded-l-lg text-slate-300 text-sm'>
                        {discount}%
                    </span>
                </div>
                <div className='text-center pt-5 h-1/4'>
                    <NavLink
                        to={`/${brand}/${id}`}
                        className='h-16 text-sm text-black uppercase  text-clip overflow-hidden hover: transition-all hover:bg-zinc-400 block'
                    >
                        {title}
                    </NavLink>
                    <button className=' p-1.5'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6 stroke-red-600'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                            />
                        </svg>
                    </button>
                    <p className='text-center text-2xl p-2'>
                        <span className='imdiz-product__cost'>
                            {newPrice} руб.
                        </span>
                    </p>
                </div>
                <div className=' flex text-center items-center mx-auto h-1/4'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5 stroke-red-600 mr-0 ml-auto'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                        />
                    </svg>
                    <button className='w-40 bg-red-500 rounded-full  ml-0 mr-auto py-1 hover:bg-red-400'>
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AutoModelsCard;
