import { useRef, useEffect } from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const modalRef = useRef();
  (useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }),
    [onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg w-[320px] text-center"
      >
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <p className="text-sm mb-6">{message}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="font-semibold bg-black text-white hover:bg-white hover:text-black border border-black transition duration-300 rounded-md py-2 px-3 flex items-center gap-1.5"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="font-semibold bg-white text-black border border-black transition duration-300 rounded-md py-2 px-3 flex items-center gap-1.5"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
