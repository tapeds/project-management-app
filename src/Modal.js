import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function Modal({ open, setOpen }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-gray-900"
                >
                  Add Item
                </Dialog.Title>
                <div className="flex flex-col mt-5 gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <input
                      id="title"
                      className="border-2 rounded-lg px-2 py-1"
                      type="text"
                      placeholder="Masukkan title"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <input
                      id="description"
                      className="border-2 rounded-lg px-2 py-1"
                      type="text"
                      placeholder="Masukkan description"
                    />
                  </div>
                </div>
                <button className="border bg-blue-200 w-full mt-5 rounded-xl py-2">
                  Add
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
