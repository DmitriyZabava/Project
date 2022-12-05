function OneModelPage() {
    return (
        <div className='product py-5 px-12 flex gap-12'>
            <>
                <div className='left flex gap-5'>
                    <div className='images '>
                        <img
                            className=' w-full h-40 object-cover cursor-pointer mb-2 '
                            src={""}
                            alt=''
                        />
                        <img
                            className=' w-full h-40 object-cover cursor-pointer mb-2 '
                            src={""}
                            alt=''
                        />
                    </div>
                    <div className='mainImg '>
                        <img
                            className=' w-full  max-h-96 object-cover'
                            src={""}
                            alt=''
                        />
                    </div>
                </div>
                <div className='right flex flex-col gap-8'>
                    <h1></h1>
                    <span className='price text-3xl font-medium text-sky-800'></span>
                    <p className=' text-lg font-light  text-justify'></p>
                    <div className='quantity flex items-center gap-3'>
                        <button className=' w-12 h-12 flex items-center content-center cursor-pointer border-none'>
                            -
                        </button>

                        <button className=' w-12 h-12 flex items-center content-center cursor-pointer border-none'>
                            +
                        </button>
                    </div>
                    <button className='add w-60 p-3 bg-sky-800 text-white flex items-center content-center gap-5 cursor-pointer border-none font-medium'>
                        ADD TO CART
                    </button>
                    <div className='info flex flex-col gap-3 text-gray-500 text-sm mt-8'>
                        <span>V</span>
                        <span>Product </span>
                        <span>Tag</span>
                    </div>
                    <hr className=' w-52 border-solid border-stone-500' />
                    <div className='info'>
                        <span>DESCRIPTION</span>
                        <hr />
                        <span>ADDITIONAL INFORMATION</span>
                        <hr className=' border-solid border-stone-500' />
                        <span>FAQ</span>
                    </div>
                </div>
            </>
        </div>
    );
}
export default OneModelPage;
