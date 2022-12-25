import React from "react";
import {useDispatch, useSelector} from "react-redux";
import TextField from "../common/form/textField";
import {activeButtonClassName, disabledButtonClassName} from "../../utils/classesForSubmitButton";
import useForm from "../../hook/useForm";
import {createModerator} from "../../store/auth";
import {getHighAccessLevel} from "../../store/user";

function CreateModerator({onVisible}) {
    const dispatch = useDispatch();
    const isAdmin = useSelector(getHighAccessLevel());
    const initialData = {
        email: "",
        password: "",
        username: "",
    };
    const {validate, isValid, handleChange, data, errors} = useForm(initialData);
    console.log(isAdmin);
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if(!isValid) return;
        isAdmin && dispatch(createModerator({...data}));
        onVisible();

    };
    const toggleVisible = () => {
        onVisible();
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
                <button
                    onClick={toggleVisible}
                    type="button"
                    className={activeButtonClassName}
                >
                    Отмена
                </button>
            </form>
        </div>
    );
}


export default CreateModerator;