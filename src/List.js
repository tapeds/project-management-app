import { FaPlus } from "react-icons/fa6";
import Card from "./Card";
import clsxm from "./clsxm";
import { useState } from "react";
import Modal from "./Modal";
import { Droppable } from "react-beautiful-dnd";

function List({ data, title, className }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} setOpen={setOpen} data={data} storage={title} />
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            className={clsxm(
              "w-1/4 bg-red-30 flex flex-col justify-between h-full p-3 gap-y-2",
              className
            )}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className="text-center font-semibold text-slate-50">
              {title}
            </div>
            <div className="h-full rounded-lg flex flex-col gap-y-1 overflow-auto">
              {data !== null &&
                data.map((card, index) => (
                  <Card
                    key={index}
                    index={index}
                    data={data}
                    storage={title}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              {provided.placeholder}
            </div>
            <div
              className="hover:cursor-pointer flex items-center gap-2 text-slate-50"
              onClick={() => setOpen(!open)}
            >
              <FaPlus className="size-4" /> Add Item
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
}

export default List;
