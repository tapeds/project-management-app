import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

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

function CustomModal({ open, setOpen, data, storage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = () => {
    if (title.length === 0 || description.length === 0) {
      return toast.error("Title and description cannot be empty");
    }
    const a = data || [];

    a.push({ title, description });

    localStorage.setItem(`${storage}`, JSON.stringify(a));
    setOpen(false);
    window.location.reload();
  };

  return (
    <Modal isOpen={open} style={customStyles}>
      <div className="w-[250px] md:w-[300px]">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-medium leading-6 text-gray-900">
            Add Item
          </h3>
          <IoClose
            className="hover:cursor-pointer size-6"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="flex flex-col mt-5 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="border-2 rounded-lg px-2 py-1"
              type="text"
              placeholder="Masukkan title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              className="border-2 rounded-lg px-2 py-1"
              type="text"
              placeholder="Masukkan description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className="border bg-gray-800 text-slate-50 hover:bg-gray-600 active:bg-gray-400 font-semibold transition-all duration-200 w-full mt-5 rounded-xl py-2"
        onClick={() => onSubmit()}
      >
        Add
      </button>
    </Modal>
  );
}

export default CustomModal;
