import { useRef } from "react";
import FormField from "./FormField";
import Modal from "../../misc/Modal";

export default function AddProjectForm({ onCancel, onSaveProject }) {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const dueDateInput = useRef();
  const errorDialog = useRef();

  function handleSave() {
    const title = titleInput.current.getInputValue();
    const description = descriptionInput.current.getInputValue();
    const dueDate = dueDateInput.current.getInputValue();

    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      errorDialog.current.open();
      return;
    }

    onSaveProject({
      title,
      description,
      dueDate,
      tasks: [],
      isDisplayed: false,
    });
  }

  return (
    <>
      <Modal ref={errorDialog} buttonCaption="Close">
        <h2 className="text-stone-900 text-xl font-semibold my-2">Invalid Input!</h2>
        <p className="text-gray-600 mb-2">Not all fields are completed!</p>
        <p className="text-gray-600 mb-2">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div>
        <div className="flex justify-end mb-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-black hover:text-stone-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-stone-950 text-white hover:text-stone-300 rounded"
          >
            Save
          </button>
        </div>

        <FormField ref={titleInput} label="Title" />
        <FormField ref={descriptionInput} label="Description" type="textarea" />
        <FormField ref={dueDateInput} label="Due Date" type="date" />
      </div>
    </>
  );
}
