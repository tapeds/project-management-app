import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import clsxm from "./clsxm";
import "./Card.css";
import { LuSave } from "react-icons/lu";
import { Draggable } from "react-beautiful-dnd";

function Card({ title, description, index, storage, data }) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [change, setChange] = useState(false);

  const onClick = () => {
    const newData = data.filter((_, i) => i !== index);
    localStorage.setItem(storage, JSON.stringify(newData));
    window.location.reload();
  };

  const editData = () => {
    const newData = data.filter((_, i) => i !== index);
    newData.push({
      title: newTitle || title,
      description: newDescription || description,
    });
    localStorage.setItem(storage, JSON.stringify(newData));
    window.location.reload();
  };

  const moveData = (newStorage) => {
    const storageData = JSON.parse(localStorage.getItem(newStorage));
    const newData = data.filter((_, i) => i === index);

    if (storageData === null) {
      const a = [];
      a.push(newData[0]);
      localStorage.setItem(newStorage, JSON.stringify(a));
    } else {
      storageData.push(newData[0]);
      localStorage.setItem(newStorage, JSON.stringify(storageData));
    }
    onClick();
  };

  const handleSelectChange = (e) => {
    const option = e.target.value;

    if (option === "To Do") moveData("To Do");
    else if (option === "In Progress") moveData("In Progress");
    else if (option === "In Revision") moveData("In Revision");
    else if (option === "Done") moveData("Done");
  };

  return (
    <Draggable draggableId={`${storage}-${index}`} index={index}>
      {(provided) => (
        <div
          className="group card-main"
          onMouseLeave={() => {
            setEdit(false);
            setChange(false);
            setNewTitle("");
            setNewDescription("");
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card-container">
            <div className={clsxm("card-block", edit && "card-block-edit")}>
              {!edit ? (
                <>
                  <h5 className="card-h5">{title}</h5>
                  <p className="card-p">{description}</p>
                </>
              ) : (
                <>
                  <input
                    placeholder="Title"
                    defaultValue={title}
                    onChange={(e) => {
                      setChange(true);
                      setNewTitle(e.target.value);
                    }}
                  />
                  <input
                    placeholder="Description"
                    defaultValue={description}
                    onChange={(e) => {
                      setChange(true);
                      setNewDescription(e.target.value);
                    }}
                  />
                </>
              )}
            </div>
            {!edit ? (
              <FaEdit className="icon-edit" onClick={() => setEdit(!edit)} />
            ) : change ? (
              <LuSave className="icon-save" onClick={() => editData()} />
            ) : (
              <FiTrash2 className="icon-delete" onClick={() => onClick()} />
            )}
          </div>
          {edit && (
            <div className="card-edit">
              <select onChange={handleSelectChange} defaultValue={"Move to"}>
                <option disabled>Move to</option>
                {storage !== "To Do" && <option>To Do</option>}
                {storage !== "In Progress" && <option>In Progress</option>}
                {storage !== "In Revision" && <option>In Revision</option>}
                {storage !== "Done" && <option>Done</option>}
              </select>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
