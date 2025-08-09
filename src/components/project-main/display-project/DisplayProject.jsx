import { useRef } from "react";
import TasksSection from "./TasksSection";

export default function DisplayProject({ project, onDelete, onAddTask, onDeleteTask }) {
  const taskInput = useRef();

  const date = new Date(project.dueDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function handleAddTask(taskName) {
    onAddTask(taskName);
    taskInput.current.clearTaskInputValue();
  }

  function handleDeleteTask(taskName) {
    onDeleteTask(taskName);
  }

  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-0">
            <h1 className="text-stone-700 text-3xl font-bold font-sans leading-normal break-words">
              {project.title}
            </h1>
            <p className="text-stone-400 font-semibold">{formattedDate}</p>
          </div>
          <button
            onClick={onDelete}
            className="text-stone-700 hover:text-black"
          >
            Delete
          </button>
        </div>
        <p className="whitespace-pre-line text-stone-700 font-sans text-base">
          {project.description}
        </p>
      </div>
      <hr className="h-px my-3 bg-gray-500 border-0" />
      <TasksSection
        ref={taskInput}
        project={project}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
