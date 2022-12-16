import Modal from "../../common/Modal";
import CreateModels from "../../ui/createModels";
import React, {useState} from "react";
import CreateAutoBrand from "../../ui/createAutoBrand";


function AdminPage() {
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const toggleVisible = (content) => {
        setModal((prevState) => !prevState);
        setModalContent(content);
    };
    return <div>
        <div className="font-bold  h-16 px-5  justify-between items-center flex ">
            <span>Админ Панель</span>
            <button onClick={() => toggleVisible("BRAND")}><span>Создать Брэнд</span></button>
            <button onClick={() => toggleVisible("MODEL")}><span>Создать Модель</span></button>
            <button onClick={() => toggleVisible("MODERATOR")}><span>Создать Модератора</span></button>
        </div>

        {modal && <Modal toggleClose={toggleVisible}>
            {modalContent === "BRAND" && <CreateAutoBrand onVisible={toggleVisible}/>}
            {modalContent === "MODEL" && <CreateModels onVisible={toggleVisible}/>}

        </Modal>}
    </div>;
}

export default AdminPage;