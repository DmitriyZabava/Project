import PropTypes from "prop-types";

function ChekcBox({ name, value, label, onChange, required = "", children }) {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    return (
        <div className='flex items-start'>
            <div className='flex items-center h-5'>
                <input
                    type='checkbox'
                    id={name}
                    name={name}
                    value=''
                    checked={value}
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3  dark:bg-gray-700 dark:border-gray-600  dark:ring-offset-gray-800'
                    required={required}
                    onChange={handleChange}
                />
            </div>
            <div className='ml-3 text-sm'>
                <label
                    htmlFor={name}
                    className='text-gray-500 dark:text-gray-300'
                >
                    {label}
                </label>
            </div>
        </div>
    );
}

ChekcBox.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default ChekcBox;
