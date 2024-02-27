import { FaPlus } from "react-icons/fa6";
import Card from "./Card";
import clsxm from "./clsxm";
import { useState } from "react";
import "./List.css";
import Modal from "./Modal";
import { Droppable } from "react-beautiful-dnd";

function List({ title, className, data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} setOpen={setOpen} storage={title} data={data} />
      <div className={clsxm("lists", className)}>
        <div className="lists-title">{title}</div>
        <Droppable droppableId={title}>
          {(provided) => (
            <div
              className="lists-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data &&
                data.map((card, index) => {
                  if (!card.deletedAt)
                    return (
                      <Card
                        key={index}
                        index={index}
                        storage={title}
                        card={card}
                        title={card.title}
                        description={card.description}
                      />
                    );
                  return null;
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="lists-button" onClick={() => setOpen(!open)}>
          <FaPlus className="icon" /> Add Item
        </div>
      </div>
    </>
  );
}

export default List;
