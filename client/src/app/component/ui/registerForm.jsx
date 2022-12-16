import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import TextField from "../common/form/textField";
import CheckBox from "../common/form/checkBox";
import { validator } from "../../utils/validator";
import { validRegisterConfig } from "../../utils/validator.config";
import { signUp } from "../../store/auth";
import {
    activeButtonClassName,
    disabledButtonClassName,
} from "../../utils/classesForSubmitButton";

function RegisterForm() {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: "",
        password: "",
        username: "",
        license: false,
    });

    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validRegisterConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValide = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(signUp({ ...data }));
        console.log("REgisterdata", data);
    };

    return (
        <div>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <TextField
                    label='Username'
                    type='text'
                    value={data.username}
                    name='username'
                    onChange={handleChange}
                    error={errors.username}
                />
                <TextField
                    label='Email'
                    type='text'
                    value={data.email}
                    name='email'
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label='Password'
                    type='password'
                    value={data.password}
                    name='password'
                    onChange={handleChange}
                    error={errors.password}
                />
                <div className='flex items-center justify-between'>
                    <CheckBox
                        name='license'
                        value={data.license}
                        label='Соглашаюсь с правилами'
                        onChange={handleChange}
                    />
                </div>
                <button
                    type='submit'
                    disabled={!isValide}
                    className={
                        !isValide
                            ? disabledButtonClassName
                            : activeButtonClassName
                    }
                >
                    Регистрация
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
