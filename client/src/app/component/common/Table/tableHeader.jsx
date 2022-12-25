import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({columns}) => {

    return (
        <thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th
                    className="h-9 w-48 ml-auto font-extrabold"
                    key={column}
                    scope="col"
                >
                    {columns[column].name}

                </th>
            ))}
        </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    columns: PropTypes.object.isRequired
};

export default TableHeader;
