import Button from "../styles/Button";

const ADD_PROJECT_BUTTON_TEXT = "+ Add Project";
const PROJECT_BUTTON_CLASS =
  "w-60 py-1 pl-2 text-left text-opacity-90 hover:text-white hover:bg-stone-800 rounded";

export default function ProjectsSectionSideBar({ onAdd, projects, onSelect }) {
  return (
    <div className="bg-stone-900 w-80 h-screen rounded-r-lg flex flex-col items-start pt-16">
      <div className="w-full px-10 space-y-8">
        <p className="text-2xl font-bold font-sans text-gray-50 text-opacity-90 uppercase text-left">
          Your Projects
        </p>
        <Button onClick={onAdd}>{ADD_PROJECT_BUTTON_TEXT}</Button>
      </div>

      <div className="w-full mt-8 space-y-2">
        {projects.map((project, index) => (
          <div key={index} className="pl-10">
            <button
              onClick={() => onSelect(project)}
              className={
                project.isDisplayed
                  ? PROJECT_BUTTON_CLASS + " bg-stone-800 text-white"
                  : PROJECT_BUTTON_CLASS + " text-gray-300"
              }
            >
              {project.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
