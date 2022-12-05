import priceWithDiscount from "../../../utils/priceWithDiscount";
import InfoCard from "../../ui/infoCard";

function OneModelPage({
    brand,
    color,
    discount,
    image,
    isAvailable,
    name,
    price,
    size,
    title,
    _id,
    id,
}) {
    const { discountMoney, newPrice } = priceWithDiscount(price, discount);

    return (
        <>
            <h1 className='my-3 text-3xl font-bold'>{title}</h1>
            <div className='product py-5 px-12 flex gap-12'>
                <div className='left flex flex-1  gap-5  '>
                    <div className='imagesflex flex-1'>
                        <img
                            className=' w-full h-72 object-cover cursor-pointer mb-2 '
                            src={image}
                            alt='img'
                        />
                        {/* <img
                            className=' w-full h-40 object-cover cursor-pointer mb-2 '
                            src={""}
                            alt='img'
                        /> */}
                    </div>
                    {/* <div className='mainImg flex flex-1'>
                        <img
                            className=' w-full  max-h-96 object-cover'
                            src=''
                            alt='img'
                        />
                    </div> */}
                </div>
                <div className='right flex flex-1 flex-col gap-8'>
                    <h1 className=' text-xl font-semibold'>{name}</h1>
                    <span className='price text-3xl font-medium text-red-800'>
                        Цена со скидкой {discount}% - {newPrice} руб.
                    </span>
                    <p className=' text-lg font-light  text-justify line-through'>
                        Цена без скидки {price} руб.
                    </p>
                    <div className='quantity flex items-center gap-3'>
                        <button className=' w-12 h-12 flex items-center content-center cursor-pointer border-none'>
                            -
                        </button>

                        <button className=' w-12 h-12 flex items-center content-center cursor-pointer border-none'>
                            +
                        </button>
                    </div>
                    <button className='add w-60 p-3 bg-sky-800 text-white flex items-center content-center gap-5 cursor-pointer border-none font-medium'>
                        Добавить в корзину
                    </button>
                    <div className='info flex flex-col gap-3 text-gray-500 text-sm mt-8'>
                        <span>V</span>
                        <span>Product </span>
                        <span>Tag</span>
                    </div>
                    <hr className=' w-52 border-solid border-stone-500' />
                    <InfoCard />
                </div>
            </div>
        </>
    );
}
export default OneModelPage;
