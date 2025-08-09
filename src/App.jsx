import ProjectMain from "./components/project-main/ProjectMain";
import ProjectsSectionSideBar from "./components/project-sidebar/ProjectsSectionSideBar";
import { useState } from "react";
import DefaultScreen from "./components/project-main/DefaultScreen";
import AddProjectForm from "./components/project-main/add-project-form/AddProjectForm";
import { ProjectStates } from "./components/project-main/constants/ProjectStates";
import DisplayProject from "./components/project-main/display-project/DisplayProject";

function App() {
  const [currentMainState, setCurrentMainState] = useState(
    ProjectStates.DEFAULT
  );

  const [projects, setProjects] = useState([]);

  function onAdd() {
    setCurrentMainState(ProjectStates.ADDING);
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.isDisplayed) {
          return { ...project, isDisplayed: false };
        }
        return project;
      })
    );
  }

  function onCancel() {
    setCurrentMainState(ProjectStates.DEFAULT);
  }

  function onSelect(selectedProject) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({
        ...project,
        isDisplayed: project === selectedProject,
      }))
    );
    setCurrentMainState(ProjectStates.DISPLAYED);
  }

  function onSaveProject(project) {
    setProjects((prevProjects) => {
      const updatedProjects = [project, ...prevProjects];

      return updatedProjects;
    });
    setCurrentMainState(ProjectStates.DEFAULT);
  }

  function onDeleteProject() {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => !project.isDisplayed)
    );
    setCurrentMainState(ProjectStates.DEFAULT);
  }

  function onAddTask(taskName) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.isDisplayed
          ? { ...project, tasks: [...project.tasks, taskName] }
          : project
      )
    );
  }

  function onDeleteTask(taskName) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.isDisplayed) {
          const index = project.tasks.indexOf(taskName);
          if (index !== -1) {
            const newTasks = [...project.tasks];
            newTasks.splice(index, 1);
            return { ...project, tasks: newTasks };
          }
        }
        return project;
      })
    );
  }

  let content = null;

  switch (currentMainState) {
    case ProjectStates.ADDING:
      content = (
        <AddProjectForm onCancel={onCancel} onSaveProject={onSaveProject} />
      );
      break;
    case ProjectStates.DISPLAYED:
      const displayedProject = projects.find((project) => project.isDisplayed);
      content = (
        <DisplayProject
          project={displayedProject}
          onDelete={onDeleteProject}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
        />
      );
      break;
    default:
      content = <DefaultScreen onAdd={onAdd} />;
  }

  return (
    <div className="flex mt-[5vh] mb-[5vh]">
      <ProjectsSectionSideBar
        onAdd={onAdd}
        projects={projects}
        onSelect={onSelect}
      />
      <ProjectMain content={content} />
    </div>
  );
}

export default App;
