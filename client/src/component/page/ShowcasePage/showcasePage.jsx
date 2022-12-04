import AtoBrandList from "../../ui/AtoBrandList/autoBrandList";
import ProductsList from "../../ui/ProductsList";

function ShowcasePage() {
    return (
        <div>
            <div className='font-bold  h-16 px-5  justify-between items-center flex '>
                <span>Categories</span>
            </div>
            <div className='grid grid-cols-5'>
                <div className=' col-span-1 '>
                    <AtoBrandList />
                </div>

                <div className='col-span-4 col-end'>
                    <ProductsList />
                </div>
            </div>
        </div>
    );
}

export default ShowcasePage;
