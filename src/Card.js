import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import clsxm from "./clsxm";
import { LuSave } from "react-icons/lu";

function Card({ title, description, index, data, storage }) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [change, setChange] = useState(false);

  const onClick = () => {
    const newData = data.filter((_, i) => i !== index);
    localStorage.setItem(`${storage}`, JSON.stringify(newData));
    window.location.reload();
  };

  const editData = () => {
    const newData = data.filter((_, i) => i !== index);
    newData.push({
      title: newTitle || title,
      description: newDescription || description,
    });
    localStorage.setItem(`${storage}`, JSON.stringify(newData));
    window.location.reload();
  };

  const moveData = (newStorage) => {
    const storageData = JSON.parse(localStorage.getItem(`${newStorage}`));
    const newData = data.filter((_, i) => i === index);
    if (storageData === null) {
      const a = [];
      a.push(newData[0]);
      localStorage.setItem(`${newStorage}`, JSON.stringify(a));
    } else {
      storageData.push(newData[0]);
      localStorage.setItem(`${newStorage}`, JSON.stringify(storageData));
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
    <div
      className="w-full bg-[#F6F6F6] py-2 flex flex-col items-center justify-center px-4 rounded-md group transition-all duration-300"
      onMouseLeave={() => {
        setEdit(false);
        setChange(false);
        setNewTitle("");
        setNewDescription("");
      }}
    >
      <div className="flex justify-between items-center text-gray-900">
        <div className={clsxm("flex flex-col", edit && "gap-0.5")}>
          {!edit ? (
            <>
              <h5 className="text-base font-semibold">{title}</h5>
              <p className="text-xs w-[150px] text-wrap truncate">
                {description}
              </p>
            </>
          ) : (
            <>
              <input
                className="w-3/4 px-1 text-sm border"
                placeholder="Title"
                defaultValue={title}
                onChange={(e) => {
                  setChange(true);
                  setNewTitle(e.target.value);
                }}
              />
              <input
                className="w-3/4 text-sm px-1 border"
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
          <FaEdit
            className="size-4 hover:cursor-pointer group-hover:opacity-100 text-gray-900 opacity-0"
            onClick={() => setEdit(!edit)}
          />
        ) : change ? (
          <LuSave
            className="size-4 hover:cursor-pointer text-green-500"
            onClick={() => editData()}
          />
        ) : (
          <FiTrash2
            className="size-4 hover:cursor-pointer text-red-500"
            onClick={() => onClick()}
          />
        )}
      </div>
      {edit && (
        <div className="group-hover:block hidden mt-1.5">
          <select
            className="py-1 px-2 rounded-lg border text-sm"
            onChange={handleSelectChange}
            defaultValue={"Move to"}
          >
            <option disabled>Move to</option>
            {storage !== "To Do" && <option>To Do</option>}
            {storage !== "In Progress" && <option>In Progress</option>}
            {storage !== "In Revision" && <option>In Revision</option>}
            {storage !== "Done" && <option>Done</option>}
          </select>
        </div>
      )}
    </div>
  );
}

export default Card;
