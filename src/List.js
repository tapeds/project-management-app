import { FaPlus } from "react-icons/fa6";
import Card from "./Card";
import clsxm from "./clsxm";
import { useState } from "react";
import Modal from "./Modal";

function List({ data, title, setData, className }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} setOpen={setOpen} setData={setData} data={data} />
      <div
        className={clsxm(
          "w-1/4 bg-red-300 flex flex-col justify-between h-full p-3 gap-y-2",
          className
        )}
      >
        <div className="text-center text-black font-semibold">{title}</div>
        <div className="h-full rounded-lg flex flex-col gap-y-1">
          {data.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
        <div
          className="hover:cursor-pointer flex items-center gap-2 text-black"
          onClick={() =>
            // setData([...data, { title: "Testing", description: "New Item" }])
            setOpen(!open)
          }
        >
          <FaPlus className="size-4" /> Add Item
        </div>
      </div>
    </>
  );
}

export default List;
