import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import TextField from "../common/form/textField";
import CheckBox from "../common/form/checkBox";
import {login} from "../../store/auth";
import {activeButtonClassName, disabledButtonClassName,} from "../../utils/classesForSubmitButton";
import useForm from "../../hook/useForm";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialData = {
        email: "",
        password: "",
        remember: false,
    };
    const {validate, isValid, handleChange, data, errors} = useForm(initialData);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if(!isValid) return;
        dispatch(login(data));
        navigate("/", {replace: true});
    };

    return (
        <div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                        name="remember"
                        value={data.remember}
                        label="Запомнить аккаунт"
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!isValid}
                    className={
                        !isValid
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
