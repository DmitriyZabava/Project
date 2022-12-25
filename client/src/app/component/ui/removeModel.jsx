import SelectField from "../common/form/selectField";
import {useDispatch, useSelector} from "react-redux";
import {getAutoModels, removeModel} from "../../store/autoModels";
import useForm from "../../hook/useForm";
import {activeButtonClassName} from "../../utils/classesForSubmitButton";
import React from "react";
import {getAccessLevel} from "../../store/user";


function RemoveModel({onVisible}) {
    const dispatch = useDispatch();
    const isAccess = useSelector(getAccessLevel());
    const autoModels = useSelector(getAutoModels());
    const initialData = {
        modelDelete: ""
    };
    const {handleChange, data} = useForm(initialData);

    const handleSubmit = (event) => {
        event.preventDefault();

        isAccess && dispatch(removeModel({...data}));
        onVisible();
    };

    const toggleVisible = () => {
        onVisible();
    };
    return ( <div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <SelectField
                label="Выбери модель для удаления"
                defaultOption="Выбери модель для удаления"
                name="modelDelete"
                options={autoModels}
                onChange={handleChange}
                value={data.modelDelete}
            />
            <button
                type="submit"
                className={activeButtonClassName}
            >
                Удалить
            </button>
            <button
                onClick={toggleVisible}
                type="button"
                className={activeButtonClassName}
            >
                Отмена
            </button>
        </form>
    </div> );
}

export default RemoveModel;