import React from "react";
import PropTypes from "prop-types";

import TextField from "../common/form/textField";
import {activeButtonClassName, disabledButtonClassName,} from "../../utils/classesForSubmitButton";
import useForm from "../../hook/useForm";
import {useDispatch, useSelector} from "react-redux";
import {getAccessLevel} from "../../store/user";
import {createBrand} from "../../store/autoBrand";

function CreateAutoBrand({onVisible}) {
    const dispatch = useDispatch();
    const isAccess = useSelector(getAccessLevel());
    const initialData = {
        id: "",
        name: "",
    };
    const {validate, isValid, handleChange, data, errors} = useForm(initialData);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if(!isValid) return;

        isAccess && dispatch(createBrand(data));
        onVisible();
    };
    const toggleVisible = () => {
        onVisible();
    };
    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center">Добавить Модель Подлокотника .</h1>
            <TextField
                label="id"
                type="text"
                value={data.id}
                name="id"
                onChange={handleChange}
                placeholder="hyundai"
            />
            <TextField
                label="Название Авто Брэнда"
                type="text"
                value={data.name}
                name="name"
                onChange={handleChange}
                placeholder="Hyundai"
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
                Отправить данные
            </button>
            <button
                onClick={toggleVisible}
                type="button"
                className={activeButtonClassName}
            >
                Отмена
            </button>
        </form>
    );
}

CreateAutoBrand.propTypes = {
    onVisible: PropTypes.func,
};

export default CreateAutoBrand;
