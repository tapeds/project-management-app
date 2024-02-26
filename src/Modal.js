import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import "./Modal.css";

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

function CustomModal({ open, setOpen, storage, data }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = () => {
    if (title.length === 0 || description.length === 0) {
      return toast.error("Title and description cannot be empty");
    }
    const a = data || [];

    a.push({ title, description });

    localStorage.setItem(storage, JSON.stringify(a));
    setOpen(false);
    window.location.reload();
  };

  return (
    <Modal isOpen={open} style={customStyles}>
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="modal-title">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Masukkan description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="modal-button" onClick={() => onSubmit()}>
        Add
      </button>
    </Modal>
  );
}

export default CustomModal;
