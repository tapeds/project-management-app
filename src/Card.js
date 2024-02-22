import { FiTrash2 } from "react-icons/fi";

function Card({ title, description }) {
  return (
    <div className="w-full bg-[#F6F6F6] py-2 flex justify-between items-center px-4 rounded-md group">
      <div className="flex flex-col">
        <h5 className="text-base font-semibold text-gray-900">{title}</h5>
        <p className="text-xs w-[150px] text-wrap truncate text-gray-900">
          {description}
        </p>
      </div>
      <FiTrash2 className="size-4 hover:cursor-pointer group-hover:opacity-100 text-red-500 opacity-0" />
    </div>
  );
}

export default Card;
