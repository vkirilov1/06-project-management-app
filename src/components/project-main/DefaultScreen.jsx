import Button from "../styles/Button";

const ADD_PROJECT_BUTTON_TEXT = "Create new project";

export default function DefaultScreen({ onAdd }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <img
        src="../../../public/logo.png"
        className="max-w-12 w-full h-auto"
        alt="No project selected image"
      />

      <p className="text-stone-900 text-xl font-semibold">
        No Project Selected
      </p>

      <p className="text-gray-500">
        Select a project or get started with a new one
      </p>
      <Button onClick={onAdd}>{ADD_PROJECT_BUTTON_TEXT}</Button>
    </div>
  );
}
