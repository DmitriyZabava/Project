import PropTypes from "prop-types";


function SelectField({
                         label,
                         value,
                         onChange,
                         defaultOption,
                         options,
                         name
                     }) {

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value});
    };
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ( {
                name: options[optionName].name,
                value: options[optionName]._id
            } ))
            : options;
    return (
        <div className="relative text-slate-500 ">
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <div>
                <div className=" relative">
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={value}
                        name={name}
                        onChange={handleChange}
                    >
                        <option
                            disabled value=""

                        >
                            {defaultOption}
                        </option>
                        {optionsArray &&
                            optionsArray.map((option) => (
                                <option

                                    value={option._id}
                                    key={option._id}>
                                    {option.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
        </div>
    );
}


SelectField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
};

export default SelectField;