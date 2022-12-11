import React, { useState, useEffect } from "react";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { validLoginConfig } from "../../utils/validator.config";
import ChekcBox from "../common/form/checkBox";

function LoginForm() {
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
        console.log(data);
    };

    const disabledButtonClassName = `w-full text-white bg-sky-300 focus:ring-4 
    focus:outline-none  font-medium rounded-lg text-sm px-5
     py-2.5 text-center dark:bg-sky-300 `;

    const activeButtonClassName = `w-full text-white bg-sky-600 hover:bg-sky-700 
    focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm 
    px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700`;

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
                    <ChekcBox
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
