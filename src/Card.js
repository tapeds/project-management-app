import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

function Card({ title, description, index, data, storage }) {
  const [edit, setEdit] = useState(false);

  const onClick = () => {
    const newData = data.filter((_, i) => i !== index);
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
      onMouseLeave={() => setEdit(false)}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h5 className="text-base font-semibold text-gray-900">{title}</h5>
          <p className="text-xs w-[150px] text-wrap truncate text-gray-900">
            {description}
          </p>
        </div>
        {!edit ? (
          <FaEdit
            className="size-4 hover:cursor-pointer group-hover:opacity-100 text-gray-900 opacity-0"
            onClick={() => setEdit(!edit)}
          />
        ) : (
          <FiTrash2
            className="size-4 hover:cursor-pointer group-hover:opacity-100 text-red-500 opacity-0"
            onClick={() => onClick()}
          />
        )}
      </div>
      {edit && (
        <div className="group-hover:block hidden mt-1.5">
          <select
            className="py-1 px-2 rounded-lg border"
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
