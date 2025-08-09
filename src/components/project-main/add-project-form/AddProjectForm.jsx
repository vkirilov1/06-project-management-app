import { useRef, useState } from "react";
import FormField from "./FormField";

export default function AddProjectForm({ onCancel, onSaveProject }) {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const dueDateInput = useRef();

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    dueDate: false,
  });

  function handleSave() {
    const title = titleInput.current.getInputValue();
    const description = descriptionInput.current.getInputValue();
    const dueDate = dueDateInput.current.getInputValue();

    const newErrors = {
      title: !title.trim(),
      description: !description.trim(),
      dueDate: !dueDate.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    onSaveProject({
      title,
      description,
      dueDate,
      tasks: [],
      isDisplayed: false,
    });
  }

  return (
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

      <FormField ref={titleInput} label="Title" invalid={errors.title} />
      <FormField
        ref={descriptionInput}
        label="Description"
        invalid={errors.description}
        type="textarea"
      />
      <FormField
        ref={dueDateInput}
        label="Due Date"
        invalid={errors.dueDate}
        type="date"
      />
    </div>
  );
}
