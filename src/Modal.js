import toast from "react-hot-toast";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import "./Modal.css";
import { FormProvider, useForm } from "react-hook-form";
import { apiToken } from "./const";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function CustomModal({ open, setOpen, storage }) {
  const methods = useForm();

  const { register, handleSubmit } = methods;

  const onSubmit = (formData) => {
    fetch("https://oprec-api.labse.in/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiToken,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        status: storage,
        dueDate: formData.dueDate,
        tags: [formData.priority],
      }),
    })
      .catch(() => toast.error("Failed to add task"))
      .then(() => {
        toast.success("Task added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    setOpen(false);
  };

  return (
    <Modal isOpen={open} style={customStyles}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-main">
            <div className="modal-container">
              <h3>Add Item</h3>
              <IoClose className="modal-close" onClick={() => setOpen(false)} />
            </div>
            <div className="modal-content">
              <div className="modal-title">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Masukkan title"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="modal-title">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  type="text"
                  placeholder="Masukkan description"
                  {...register("description", { required: true })}
                />
              </div>
              <div className="modal-title">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  type="date"
                  placeholder="Masukkan description"
                  {...register("dueDate", { required: true })}
                />
              </div>
              <div className="modal-title">
                <label htmlFor="priority">Priority</label>
                <div className="priority-radio">
                  <div className="priority-label">
                    <input
                      type="radio"
                      className="priority-radio-button"
                      placeholder="Masukkan description"
                      value="Low"
                      {...register("priority", { required: true })}
                    />
                    <label htmlFor="priority">Low</label>
                  </div>
                  <div className="priority-label">
                    <input
                      type="radio"
                      className="priority-radio-button"
                      placeholder="Masukkan description"
                      value="Medium"
                      {...register("priority", { required: true })}
                    />
                    <label htmlFor="priority">Medium</label>
                  </div>
                  <div className="priority-label">
                    <input
                      type="radio"
                      className="priority-radio-button"
                      placeholder="Masukkan description"
                      value="High"
                      {...register("priority", { required: true })}
                    />
                    <label htmlFor="priority">High</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="modal-button" type="submit">
            Add
          </button>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default CustomModal;
