import { useImperativeHandle, useRef, useState } from "react";

export default function TasksSection({
  ref,
  project,
  onAddTask,
  onDeleteTask,
}) {
  const INPUT_CLASS = "h-8 w-60 rounded py-1 pl-2 text-left";

  const taskInput = useRef();
  const projectTasks = project.tasks;

  const [isCorrect, setIsCorrect] = useState(true);

  useImperativeHandle(ref, () => ({
    clearTaskInputValue() {
      taskInput.current.value = "";
    },
  }));

  function handleAddTask(taskName) {
    if (!taskName.trim()) {
      setIsCorrect(false);
      return;
    }
    setIsCorrect(true);
    onAddTask(taskName);
  }

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-stone-700 text-2xl font-bold font-sans leading-normal break-words">
        Tasks
      </h2>
      <div className="flex flex-row space-x-4">
        <input
          ref={taskInput}
          className={
            isCorrect
              ? INPUT_CLASS + " bg-gray-200"
              : INPUT_CLASS + " bg-red-200"
          }
        />
        <button onClick={() => handleAddTask(taskInput.current.value)}>
          Add Task
        </button>
      </div>
      {projectTasks.length > 0 ? (
        <div className="bg-gray-100 rounded py-8 px-4 space-y-2">
          {projectTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between">
              <p>{task}</p>
              <button
                onClick={() => onDeleteTask(task)}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>This project does not have any tasks yet.</p>
      )}
    </div>
  );
}
