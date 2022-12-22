import PropTypes from "prop-types";
import {useState} from "react";


function FileField({type, value, name, onChange, label, placeholder, accept}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileChange = ({target}) => {
        onChange(target.files[0]);
    };


    return (
        <div className="relative text-slate-500">
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <div>
                <div className=" relative">
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type={type}
                        value={value}
                        accept={accept}
                        name={name}
                        onChange={fileChange}

                    />

                </div>

            </div>
        </div>
    );
}

FileField.defaultProps = {type: "file"};

FileField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
};

export default FileField;
