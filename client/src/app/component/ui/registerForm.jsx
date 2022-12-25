import React from "react";
import {useDispatch, useSelector} from "react-redux";

import TextField from "../common/form/textField";
import CheckBox from "../common/form/checkBox";

import {getAuthError, signUp} from "../../store/auth";
import {activeButtonClassName, disabledButtonClassName,} from "../../utils/classesForSubmitButton";
import {useNavigate} from "react-router-dom";
import useForm from "../../hook/useForm";


function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authError = useSelector(getAuthError());
    const initialData = {
        email: "",
        password: "",
        username: "",
        license: false,
    };
    const {validate, isValid, handleChange, data, errors} = useForm(initialData);


    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if(!isValid) return;
        dispatch(signUp({...data}));
        navigate("/", {replace: true});


    };

    return (
        <div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    type="text"
                    value={data.username}
                    name="username"
                    onChange={handleChange}
                    error={errors.username}
                />
                <TextField
                    label="Email"
                    type="text"
                    value={data.email}
                    name="email"
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={data.password}
                    name="password"
                    onChange={handleChange}
                    error={errors.password}
                />
                <div className="flex items-center justify-between">
                    <CheckBox
                        name="license"
                        value={data.license}
                        label="Соглашаюсь с правилами"
                        onChange={handleChange}
                    />
                </div>
                {authError && <p className="text-red-400 text-sm">{authError}</p>}
                <button
                    type="submit"
                    disabled={!isValid}
                    className={
                        !isValid
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
