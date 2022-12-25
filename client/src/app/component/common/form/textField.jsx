import PropTypes from "prop-types";
import {useState} from "react";
import {eye, eyeSlash} from "../svg/svg.icon";

function TextField({type, value, name, onChange, label, placeholder, error}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value});
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
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
                        type={showPassword ? "text" : type}
                        value={value}
                        name={name}
                        onChange={handleChange}
                        placeholder={placeholder}
                    />
                    {type === "password" && (
                        <button
                            className="absolute inset-y-0.5 right-2.5 object-right  text-slate-500"
                            type="button"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? eye : eyeSlash}
                        </button>
                    )}
                </div>
                {error && <div>{error}</div>}
            </div>
        </div>
    );
}

TextField.defaultProps = {type: "text"};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
};

export default TextField;
