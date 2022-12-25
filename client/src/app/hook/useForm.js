import {useEffect, useState} from "react";
import {validator} from "../utils/validator";
import {validRegisterConfig} from "../utils/validator.config";

const useForm = (initialData) => {
    const [data, setData] = useState(initialData);

    const handleChange = (target) => {
        setData((prevState) => ( {
            ...prevState,
            [target.name]: target.value,
        } ));
    };
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validRegisterConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return {validate, isValid, handleChange, data, errors};
};

export default useForm;