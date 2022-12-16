import PropTypes from "prop-types";
import React from 'react';


function Modal({toggleClose, children}) {

    return ( <>
            <div
                onClick={toggleClose} className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"/>

            <div
                className="w-[580px] p-5 top-16 rounded bg-gray-50 dark:bg-gray-900 absolute  left-1/2 -translate-x-1/2 text-gray-900 dark:text-white"
            >

                {children}
            </div>
        </>
    );
};

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,

    ]),
    toggleClose: PropTypes.func
};

export default Modal;