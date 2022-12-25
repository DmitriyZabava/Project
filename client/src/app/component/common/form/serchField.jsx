import React from "react";
import PropTypes from "prop-types";

function SearchField({onSearch, searchQuery}) {
    return (
        <div
            className="text-lg font-medium"
        >
            <input type="text"
                   name="searchQuery"
                   placeholder="Поиск модели"
                   className="w-[400px] bg-gray-50 border border-gray-300"
                   onChange={onSearch}
                   value={searchQuery}
            />
        </div>
    );
}

SearchField.propTypes = {
    onSearch: PropTypes.func,
    searchQuery: PropTypes.string
};
export default SearchField;