import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import clsxm from "./clsxm";
import "./Card.css";
import { LuSave } from "react-icons/lu";
import { Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { apiToken } from "./const";

function Card({ card, index, storage }) {
  const [edit, setEdit] = useState(false);

  const methods = useForm();
  const { register, handleSubmit } = methods;

  const onClick = () => {
    fetch(`https://oprec-api.labse.in/api/task/${card._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiToken,
      },
    })
      .then(() => {
        toast.success("Task deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch(() => toast.error("Failed to delete task"));
  };

  const editData = (formData) => {
    fetch(`https://oprec-api.labse.in/api/task/${card._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiToken,
      },
      body: JSON.stringify({
        title: formData.title || card.title,
        description: formData.description || card.description,
        dueDate: formData.dueDate || card.dueDate,
        tags: [formData.priority || card.tags[0]],
      }),
    })
      .then(() => {
        toast.success("Task updated successfully");
        setEdit(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch(() => toast.error("Failed to update task"));
  };

  function getDaysFromToday(dateString) {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const givenDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round(Math.abs((today - givenDate) / oneDay));

    return diffDays;
  }

  const date = new Date(card.dueDate);
  const dateString = date.toDateString();
  const daysFromToday = getDaysFromToday(dateString);

  return (
    <Draggable draggableId={`${storage}-${index}`} index={index}>
      {(provided) => (
        <div
          className="group card-main"
          onMouseLeave={() => setEdit(false)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(editData)}>
              <div className="card-container">
                <div className={clsxm("card-block", edit && "card-block-edit")}>
                  {!edit ? (
                    <>
                      <h5 className="card-h5">{card.title}</h5>
                      <p className="card-p">{card.description}</p>
                      <div className="card-tags">
                        <p className="card-due">
                          Due{" "}
                          <span className="card-color">{daysFromToday}</span>{" "}
                          days left
                        </p>
                        {card.tags[0] === "Low" && (
                          <div className="card-low">Low</div>
                        )}
                        {card.tags[0] === "Medium" && (
                          <div className="card-medium">Medium</div>
                        )}
                        {card.tags[0] === "High" && (
                          <div className="card-high">High</div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <label htmlFor="priority" className="card-label">
                        Title
                      </label>
                      <input
                        placeholder="Edit title"
                        className="card-input"
                        {...register("title")}
                      />
                      <label htmlFor="priority" className="card-label">
                        Description
                      </label>
                      <input
                        placeholder="Edit description"
                        className="card-input"
                        {...register("description")}
                      />
                      <label htmlFor="priority" className="card-label">
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="card-select"
                        defaultValue={card.tags[0]}
                        {...register("priority")}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                      <label htmlFor="date" className="card-label">
                        Change Due Date
                      </label>
                      <input id="date" type="date" {...register("dueDate")} />
                    </>
                  )}
                </div>
                {!edit ? (
                  <FaEdit
                    className="icon-edit"
                    onClick={() => setEdit(!edit)}
                  />
                ) : (
                  <div className="icon-group">
                    <button type="submit">
                      <LuSave className="icon-save" />
                    </button>
                    <FiTrash2
                      className="icon-delete"
                      onClick={() => onClick()}
                    />
                  </div>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
