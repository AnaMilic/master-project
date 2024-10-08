import styled from "styled-components";
import EditModal from "./EditModal";
import AddNewModal from "./AddNewModal";
import Logout from "./Logout";
import TaskCardComponent from "./TaskCardComponent";
import TaskColumnComponent from "./TaskColumnComponent";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Task } from "../types/Task";
import DateTime from "./DateTime";

function MainPage() {
  const url = "http://localhost:5050/api/tasks/";

  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [testingTasks, setTestingTasks] = useState<Task[]>([]);

  const tasks = [...todoTasks, ...doingTasks, ...doneTasks, ...testingTasks];

  const [editModalData, setEditModalData] = useState<null | Task>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const todoColRef = useRef<HTMLDivElement>(null);
  const doingColRef = useRef<HTMLDivElement>(null);
  const doneColRef = useRef<HTMLDivElement>(null);
  const testingColRef = useRef<HTMLDivElement>(null);

  const editModalRef = useRef(null);
  const addModalRef = useRef(null);

  const loginedUser = JSON.parse(localStorage.getItem("user")!);

  const getTasks = () => {
    return axios
      .get(url)
      .then((res) => {
        res.data.forEach((task: Task) => {
          switch (task.status) {
            case "todo":
              setTodoTasks((curr) => {
                return [...curr, task];
              });
              break;
            case "doing":
              setDoingTasks((curr) => {
                return [...curr, task];
              });
              break;
            case "done":
              setDoneTasks((curr) => {
                return [...curr, task];
              });
              break;
            case "testing":
              setTestingTasks((curr) => {
                return [...curr, task];
              });
              break;
            default:
              break;
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  function drag(event: React.DragEvent<HTMLDivElement>) {
    if (loginedUser.role === "client") {
      return;
    } else {
      event.dataTransfer.setData("text", event.currentTarget.id);
    }
  }
  function allowDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }
  function drop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const task = tasks.find((t) => t._id === id);
    let status = "";
    const oldStatus = task!.status;

    if (todoColRef.current!.contains(event.target as Node)) {
      status = "todo";
    }
    if (doingColRef.current!.contains(event.target as Node)) {
      status = "doing";
    }
    if (doneColRef.current!.contains(event.target as Node)) {
      status = "done";
    }
    if (testingColRef.current!.contains(event.target as Node)) {
      status = "testing";
    }
    if (oldStatus === status || status === "") return;

    switch (oldStatus) {
      case "todo":
        setTodoTasks((oldTasks) => [
          ...oldTasks.filter((oldTask) => oldTask._id !== task!._id),
        ]);
        break;
      case "doing":
        setDoingTasks((oldTasks) => [
          ...oldTasks.filter((oldTask) => oldTask._id !== task!._id),
        ]);
        break;
      case "done":
        setDoneTasks((oldTasks) => [
          ...oldTasks.filter((oldTask) => oldTask._id !== task!._id),
        ]);
        break;
      case "testing":
        setTestingTasks((oldTasks) => [
          ...oldTasks.filter((oldTask) => oldTask._id !== task!._id),
        ]);
        break;
      default:
        break;
    }
    switch (status) {
      case "todo":
        setTodoTasks((oldTasks) => [...oldTasks, task] as Task[]);
        break;
      case "doing":
        setDoingTasks((oldTasks) => [...oldTasks, task] as Task[]);
        break;
      case "done":
        setDoneTasks((oldTasks) => [...oldTasks, task] as Task[]);
        break;
      case "testing":
        setTestingTasks((oldTasks) => [...oldTasks, task] as Task[]);
        break;
      default:
        break;
    }
    editTaskStatus(event, task!, status);
  }

  function editTaskStatus(
    event: React.DragEvent<HTMLDivElement>,
    task: Task,
    status: string
  ) {
    event.stopPropagation();
    event.preventDefault();

    return axios
      .patch("http://localhost:5050/api/tasks", {
        task: {
          ...task,
          status,
        },
      })
      .then((response) => {
        const updatedTask = response.data;
        switch (updatedTask.status) {
          case "todo":
            setTodoTasks((oldTasks) => {
              const filteredOldTasks = oldTasks.filter(
                (old) => old._id !== task._id
              );
              return [...filteredOldTasks, updatedTask];
            });
            break;
          case "doing":
            setDoingTasks((oldTasks) => {
              const filteredOldTasks = oldTasks.filter(
                (old) => old._id !== task._id
              );
              return [...filteredOldTasks, updatedTask];
            });
            break;
          case "done":
            setDoneTasks((oldTasks) => {
              const filteredOldTasks = oldTasks.filter(
                (old) => old._id !== task._id
              );
              return [...filteredOldTasks, updatedTask];
            });
            break;
          case "testing":
            setTestingTasks((oldTasks) => {
              const filteredOldTasks = oldTasks.filter(
                (old) => old._id !== task._id
              );
              return [...filteredOldTasks, updatedTask];
            });
            break;
          default:
            break;
        }
      })
      .catch((error) =>
        alert(`Failed change of the task status. Error: ${error}`)
      )
      .finally(() => setEditModalData(null));
  }
  function deleteTask(task: Task) {
    try {
      axios
        .delete("http://localhost:5050/api/tasks", {
          params: task,
        })
        .then((response) => {
          const deletedTask = response.data;
          switch (deletedTask.status) {
            case "todo":
              setTodoTasks((oldTasks) => {
                const tasks = oldTasks.filter((t) => t._id !== task._id);
                return [...tasks];
              });
              break;
            case "doing":
              setDoingTasks((oldTasks) => {
                const tasks = oldTasks.filter((t) => t._id !== task._id);
                return [...tasks];
              });
              break;
            case "done":
              setDoneTasks((oldTasks) => {
                const tasks = oldTasks.filter((t) => t._id !== task._id);
                return [...tasks];
              });
              break;
            case "testing":
              setTestingTasks((oldTasks) => {
                const tasks = oldTasks.filter((t) => t._id !== task._id);
                return [...tasks];
              });
              break;
            default:
              break;
          }
          alert("Task is successfully deleted.");
        });
    } catch (error) {
      alert(`Deleting task failed. Error: ${error}`);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  //ovo mi izgleda ne radi???
  useEffect(() => {
    function outsideModalClick(event: MouseEvent) {
      if (event.target === addModalRef.current) {
        setIsAddModalVisible(false);
      }
      if (event.target === editModalRef.current) {
        setEditModalData(null);
      }
    }
    window.addEventListener("click", outsideModalClick);

    return () => {
      window.removeEventListener("click", outsideModalClick);
    };
  }, []);
  return (
    <>
      <DateTime />
      {loginedUser.role === "developer" && (
        <AddNewButton onClick={() => setIsAddModalVisible(true)}>
          Add new task
        </AddNewButton>
      )}
      <Logout />

      {isAddModalVisible && (
        <AddNewModal
          todoTasks={todoTasks}
          onAddTask={(task: Task) => {
            console.log({ task });
            setTodoTasks((oldState) => [...oldState, task]);
            setIsAddModalVisible(false);
          }}
          onClose={() => setIsAddModalVisible(false)}
          ref={addModalRef}
        />
      )}

      {editModalData && (
        <EditModal
          data={editModalData}
          onClose={() => setEditModalData(null)}
          ref={editModalRef}
        />
      )}

      <MainPageFragment>
        <TaskColumnComponent
          id="todoColumn"
          onDragOver={(event) => allowDrop(event)}
          onDrop={(event) => drop(event)}
          borderTopColor="#ff5659"
          ref={todoColRef}
        >
          <ColumnTitle>To do ({todoTasks.length})</ColumnTitle>

          {todoTasks.map((task) => {
            return (
              <TaskCardComponent
                key={Math.random() * Date.now()}
                id={task._id}
                title={task.title}
                description={task.description}
                taskType={task.type}
                priority={task.priority}
                userDeveloper={task.userDeveloper}
                userTester={task.userTester}
                userDeveloper2={task.userDeveloper2}
                userTester2={task.userTester2}
                requiredTime={task.requiredTime}
                onDragStart={(event) => {
                  drag(event);
                }}
                onEditClick={() => setEditModalData(task)}
                onDeleteClick={() => {
                  if (
                    !confirm(
                      `Are you sure you want to delete task "${task.title}"?`
                    )
                  )
                    return;
                  else deleteTask(task);
                }}
              />
            );
          })}
        </TaskColumnComponent>
        <TaskColumnComponent
          id="doingColumn"
          onDragOver={(event) => allowDrop(event)}
          onDrop={(event) => drop(event)}
          borderTopColor="#ffff80"
          ref={doingColRef}
        >
          <ColumnTitle>In progress ({doingTasks.length})</ColumnTitle>
          {doingTasks.map((task) => {
            return (
              <TaskCardComponent
                key={Math.random() * Date.now()}
                id={task._id}
                title={task.title}
                description={task.description}
                taskType={task.type}
                priority={task.priority}
                userDeveloper={task.userDeveloper}
                userTester={task.userTester}
                userDeveloper2={task.userDeveloper2}
                userTester2={task.userTester2}
                requiredTime={task.requiredTime}
                onDragStart={(event) => {
                  drag(event);
                }}
                onEditClick={() => setEditModalData(task)}
                onDeleteClick={() => {
                  if (
                    !confirm(
                      `Are you sure you want to delete task "${task.title}"?`
                    )
                  )
                    return;
                  else deleteTask(task);
                }}
              />
            );
          })}
        </TaskColumnComponent>
        <TaskColumnComponent
          id="testingColumn"
          onDragOver={(event) => allowDrop(event)}
          onDrop={(event) => drop(event)}
          borderTopColor="#99c7ff"
          ref={testingColRef}
        >
          <ColumnTitle>Testing ({testingTasks.length})</ColumnTitle>
          {testingTasks.map((task) => {
            return (
              <TaskCardComponent
                key={Math.random() * Date.now()}
                id={task._id}
                title={task.title}
                description={task.description}
                taskType={task.type}
                priority={task.priority}
                userDeveloper={task.userDeveloper}
                userTester={task.userTester}
                userDeveloper2={task.userDeveloper2}
                userTester2={task.userTester2}
                requiredTime={task.requiredTime}
                onDragStart={(event) => {
                  drag(event);
                }}
                onEditClick={() => setEditModalData(task)}
                onDeleteClick={() => {
                  if (
                    !confirm(
                      `Are you sure you want to delete task "${task.title}"?`
                    )
                  )
                    return;
                  else deleteTask(task);
                }}
              />
            );
          })}
        </TaskColumnComponent>
        <TaskColumnComponent
          id="doneColumn"
          onDragOver={(event) => allowDrop(event)}
          onDrop={(event) => drop(event)}
          borderTopColor="#99ff99"
          ref={doneColRef}
        >
          <ColumnTitle>Done ({doneTasks.length})</ColumnTitle>
          {doneTasks.map((task) => {
            return (
              <TaskCardComponent
                key={Math.random() * Date.now()}
                id={task._id}
                title={task.title}
                description={task.description}
                taskType={task.type}
                priority={task.priority}
                userDeveloper={task.userDeveloper}
                userTester={task.userTester}
                userDeveloper2={task.userDeveloper2}
                userTester2={task.userTester2}
                requiredTime={task.requiredTime}
                onDragStart={(event) => {
                  drag(event);
                }}
                onEditClick={() => setEditModalData(task)}
                onDeleteClick={() => {
                  if (
                    !confirm(
                      `Are you sure you want to delete task "${task.title}"?`
                    )
                  )
                    return;
                  else deleteTask(task);
                }}
              />
            );
          })}
        </TaskColumnComponent>
      </MainPageFragment>
    </>
  );
}

export default MainPage;

const MainPageFragment = styled.div`
  width: 94vw;
  height: 90vh;
  background: white;
  margin: 2vh 3vw;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AddNewButton = styled.button`
  background-color: #f9f0e4;
  position: fixed;
  top: 1vh;
  right: 8vw;
  border: 1px solid grey;
  box-shadow: 2px 3px 5px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
`;

const ColumnTitle = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  background: #f2e8c4;
  font-size: large;
  padding: 2px 5px;
  font-weight: bold;
`;
