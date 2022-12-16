import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import TextField from "../common/form/textField";
import {activeButtonClassName, disabledButtonClassName,} from "../../utils/classesForSubmitButton";
import {validCreateBrand} from "../../utils/validator.config";
import {validator} from "../../utils/validator";

function CreateAutoBrand({onVisible}) {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        id: "",
        name: "",
        brand: "",
    });

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validCreateBrand);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValide = Object.keys(errors).length === 0;
    const handleChange = (target) => {
        setData((prevState) => ( {
            ...prevState,
            [target.name]: target.value,
        } ));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
            <TextField
                label="Модели"
                type="text"
                value={data.brand}
                name="brand"
                onChange={handleChange}
                placeholder="hyundai"
            />
            <button
                type="submit"
                disabled={!isValide}
                className={
                    !isValide
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
