import { LuTrash2 } from "react-icons/lu";

function Card({ title, description }) {
  return (
    <div className="w-full bg-white py-2 flex justify-between items-center px-4 rounded-md peer">
      <div className="flex flex-col">
        <h5 className="text-base font-semibold">{title}</h5>
        <p className="text-xs">{description}</p>
      </div>
      <LuTrash2 className="size-4 hover:cursor-pointer peer-hover:opacity-100 opacity-0" />
    </div>
  );
}

export default Card;
