import React, { useEffect, useState } from "react";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { validLoginConfig } from "../../utils/validator.config";
import CheckBox from "../common/form/checkBox";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import {
    activeButtonClassName,
    disabledButtonClassName,
} from "../../utils/classesForSubmitButton";
import { useLocation } from "react-router-dom";

function LoginForm() {
    const dispatch = useDispatch();
    const location = useLocation();

    const [data, setData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validLoginConfig);
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
        dispatch(login(data));

        console.log("loginData", data);
    };

    return (
        <div>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
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
                        name='remember'
                        value={data.remember}
                        label='Запомнить аккаунт'
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
                    Вход в аккаунт
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
