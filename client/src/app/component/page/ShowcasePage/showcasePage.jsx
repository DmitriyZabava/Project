import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getaAtoBrand, getAutoBrandLoadStatus} from "../../../store/autoBrand";
import {getAutoModels, getAutoModelsLoadStatus,} from "../../../store/autoModels";
import paginate from "../../../utils/paginate";
import Loader from "../../common/Loader";
import Pagination from "../../common/Pagination";
import AtoBrandList from "../../ui/AtoBrandList/autoBrandList";
import AutoModelsList from "../../ui/AutoModelsList";
import SearchField from "../../common/form/serchField";

function ShowcasePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const autoModels = useSelector(getAutoModels());
    const autoModelsLoading = useSelector(getAutoModelsLoadStatus());
    const autoBrand = useSelector(getaAtoBrand());
    const autoBrandLoading = useSelector(getAutoBrandLoadStatus());

    const [selectedBrand, setSelectedBrand] = useState();

    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSearchQuery = ({target}) => {
        setSearchQuery(target.value);
        setSelectedBrand(undefined);
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        if(searchQuery !== "") {
            setSearchQuery("");
        }
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBrand, searchQuery]);

    if(autoModels && autoBrand) {
        const filteredModels = searchQuery ?
            autoModels.filter((model) => model.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedBrand
                ? autoModels.filter((model) => model.brand === selectedBrand)
                : autoModels;

        const count = filteredModels.length;
        const autoModelsSlice = paginate(filteredModels, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedBrand(undefined);
            setSearchQuery("");
        };
        if(!autoBrandLoading && !autoModelsLoading) {
            return (
                <div className="">
                    <div
                        className="font-bold  h-16 px-5  justify-between items-center flex rounded-lg focus:border-gray-500">
                        <span>Categories</span>

                        <SearchField
                            onSearch={handleSearchQuery}
                            searchQuery={searchQuery}
                        />
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col shrink-0 basis-1/4">
                            <AtoBrandList
                                onBrandSelect={handleBrandSelect}
                                autoBrand={autoBrand}
                                selectedBrand={selectedBrand}
                                clearFilter={clearFilter}
                            />
                        </div>

                        <div className="flex flex-col basis-3/4 ">
                            <AutoModelsList autoModels={autoModelsSlice}/>
                            <div className="flex content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="loader flex justify-center mt-20">
                    <Loader/>
                </div>
            );
        }
    }
}

export default ShowcasePage;
