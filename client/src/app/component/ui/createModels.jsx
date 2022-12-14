import React, {useState} from "react";
import PropTypes from "prop-types";

import TextField from "../common/form/textField";
import {activeButtonClassName, disabledButtonClassName,} from "../../utils/classesForSubmitButton";
import {useDispatch, useSelector} from "react-redux";
import {createModel} from "../../store/autoModels";
import FileField from "../common/form/fileField";
import useForm from "../../hook/useForm";
import {getAccessLevel} from "../../store/user";

function CreateModels({onVisible}) {
    const dispatch = useDispatch();
    const isAccess = useSelector(getAccessLevel());
    const initialData = {
        id: "",
        name: "",
        brand: "",
        title: "",
        price: "",
        color: "",
        size: "",
        isAvailable: "",
        discount: "",
    };
    const {validate, isValid, handleChange, data, errors} = useForm(initialData);

    const [image, setImg] = useState(( null ));
    const fileChange = (target) => {
        setImg(target);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if(!isValid) return;
        const formData = new FormData();
        formData.append("img", image);
        formData.append("data", JSON.stringify(data));
        isAccess && dispatch(createModel(formData));
        onVisible();
    };

    const toggleVisible = () => {
        onVisible();
    };
    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}
              encType="multipart/form-data"
        >
            <h1 className="text-2xl text-center text-gray-300 ">Добавить Модель Подлокотника </h1>
            <TextField
                label="id"
                type="text"
                value={data.id}
                name="id"
                onChange={handleChange}
                placeholder="Elantra"
                error={errors.id}
            />
            <TextField
                label="Название модели"
                type="text"
                value={data.name}
                name="name"
                onChange={handleChange}
                placeholder="Hyundai Elantra"
                error={errors.name}
            />
            <TextField
                label="Авто Брэнд"
                type="text"
                value={data.brand}
                name="brand"
                onChange={handleChange}
                placeholder="hyundai"
                error={errors.brand}
            />
            <TextField
                label="Краткое описание"
                type="text"
                value={data.title}
                name="title"
                onChange={handleChange}
                placeholder="Подлокотник Премиум Hyundai Elantra (2006-2011)"
                error={errors.title}
            />
            <TextField
                label="Цена"
                type="number"
                value={data.price}
                name="price"
                onChange={handleChange}
                placeholder="3000"
                error={errors.price}
            />
            <FileField
                label="image"
                type="file"
                value={data.img}
                accept="image/*,.png,.jpg,.gif,.web"
                name="img"
                onChange={fileChange}
            />
            <TextField
                label="Размер : Д х Ш х В"
                type="text"
                value={data.size}
                name="size"
                onChange={handleChange}
                placeholder="Размер: длина 310 мм, ширина 180 мм, высота 140 мм"
                error={errors.size}
            />
            <TextField
                label="Цвет"
                type="text"
                value={data.color}
                name="color"
                onChange={handleChange}
                placeholder="Цвет черный"
                error={errors.size}
            />
            <TextField
                label="Доступно на складе"
                type="text"
                value={data.isAvailable}
                name="isAvailable"
                onChange={handleChange}
                placeholder="шт. на складе"

            />
            <TextField
                label="Скидка %"
                type="number"
                value={data.discount}
                name="discount"
                onChange={handleChange}
                placeholder="10"
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
                type="button"
                className={activeButtonClassName}
                onClick={toggleVisible}
            >
                Отмена
            </button>
        </form>
    );
}

CreateModels.propTypes = {
    onVisible: PropTypes.func,
};

export default CreateModels;
