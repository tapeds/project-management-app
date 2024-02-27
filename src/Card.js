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
        }, 1000);
      })
      .catch(() => toast.error("Failed to delete task"));
  };

  const editData = (formData) => {
    fetch(`https://oprec-api.labse.in/api/task/${card._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiToken,
        body: JSON.stringify(formData),
      },
    })
      .then(() => {
        toast.success("Task updated successfully");
        setEdit(false);
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
                      <p className="card-p">
                        Due <span className="card-color">{daysFromToday}</span>{" "}
                        days left
                      </p>
                    </>
                  ) : (
                    <>
                      <h5 className="card-h5">{card.title}</h5>
                      <p className="card-p">{card.description}</p>
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
