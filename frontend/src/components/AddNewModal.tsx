import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { User } from "../types/User";
import { Task } from "../types/Task";

const AddNewModal = forwardRef(
  (
    {
      todoTasks,
      onAddTask,
      onClose,
    }: {
      todoTasks: Task[];
      onAddTask: (Task: Task) => void;
      onClose: () => void;
    },
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
    const [users, setUsers] = useState<User[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskType, setTaskType] = useState("");
    const [priority, setPriority] = useState("");
    const [userDeveloper, setUserDeveloper] = useState("");
    const [userTester, setUserTester] = useState("");
    const [userDeveloper2, setUserDeveloper2] = useState("");
    const [userTester2, setUserTester2] = useState("");

    useEffect(() => {
      fetch("http://localhost:5050/api/users")
        .then((response) => response.json())
        .then((data: User[]) => {
          setUsers(data);
          setTaskType("new feature");
          setPriority("1");
          setUserDeveloper(data[0].username);
          setUserTester(data[0].username);
          setUserDeveloper2(data[0].username);
          setUserTester2(data[0].username);
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.stopPropagation();
      event.preventDefault();
      console.log(`duzina taskova ${todoTasks.length}`);
      if (todoTasks.length >= 3) {
        console.log("uslo u if");
        alert("You can't have more than 3 tasks in To do column!");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user")!).user;

      try {
        const reqBody = JSON.stringify({
          task: {
            title,
            description,
            taskType,
            priority,
          },
          userDeveloper,
          userTester,
          userDeveloper2,
          userTester2,
          user,
        });
        if (!reqBody) return;

        const res = await fetch("http://localhost:5050/api/tasks", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: reqBody,
        });
        const formattedResponse = await res.json();

        if (res.status === 200) {
          setTitle("");
          setDescription("");
          onAddTask(formattedResponse);
          alert("A new task has been successfully added.");
        } else {
          alert(formattedResponse);
        }
      } catch (error) {
        alert(error);
      }
    };

    return (
      <AddModalElement open id="addModal" ref={ref}>
        <ModalTitle>Create new task</ModalTitle>
        <CloseAddModal onClick={onClose}>X</CloseAddModal>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <FlexColumn>
            <label htmlFor="title" style={{ color: "#483f3f" }}>
              <b>Title: </b>
            </label>
            <FormInput
              type="text"
              name="title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></FormInput>
          </FlexColumn>

          <FlexColumn>
            <label htmlFor="description" style={{ color: "#483f3f" }}>
              <b>Description: </b>
            </label>
            <FormTextArea
              name="description"
              required
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></FormTextArea>
          </FlexColumn>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <FlexColumn>
              <label htmlFor="taskType" style={{ color: "#483f3f" }}>
                <b>Type: </b>
              </label>
              <FormSelect
                name="taskType"
                onChange={(event) => setTaskType(event.target.value)}
              >
                <FormOption value="new feature">New feature</FormOption>
                <FormOption value="change">Change</FormOption>
                <FormOption value="bug">Bug</FormOption>
                <FormOption value="other">Other</FormOption>
              </FormSelect>
            </FlexColumn>
            <FlexColumn>
              <label htmlFor="priority" style={{ color: "#483f3f" }}>
                <b>Priority: </b>
              </label>
              <FormSelect
                name="priority"
                onChange={(event) => setPriority(event.target.value)}
              >
                <FormOption value="1">1</FormOption>
                <FormOption value="2">2</FormOption>
                <FormOption value="3">3</FormOption>
                <FormOption value="4">4</FormOption>
                <FormOption value="5">5</FormOption>
              </FormSelect>
            </FlexColumn>
          </div>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <FlexColumn>
              <label htmlFor="developer" style={{ color: "#483f3f" }}>
                <b>First developer: </b>
              </label>
              <FormSelect
                name="developer"
                value={userDeveloper}
                onChange={(event) => setUserDeveloper(event.target.value)}
              >
                {users.map(({ username, _id }) => (
                  <FormOption value={username} key={_id}>
                    {username}
                  </FormOption>
                ))}
              </FormSelect>
            </FlexColumn>
            <FlexColumn>
              <label htmlFor="tester" style={{ color: "#483f3f" }}>
                <b>First tester: </b>
              </label>
              <FormSelect
                name="tester"
                value={userTester}
                onChange={(event) => setUserTester(event.target.value)}
              >
                {users.map(({ username, _id }) => (
                  <FormOption value={username} key={_id}>
                    {username}
                  </FormOption>
                ))}
              </FormSelect>
            </FlexColumn>
          </div>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <FlexColumn>
              <label htmlFor="developer2" style={{ color: "#483f3f" }}>
                <b>Second developer: </b>
              </label>
              <FormSelect
                name="developer2"
                value={userDeveloper2}
                onChange={(event) => setUserDeveloper2(event.target.value)}
              >
                {users.map(({ username, _id }) => (
                  <FormOption value={username} key={_id}>
                    {username}
                  </FormOption>
                ))}
              </FormSelect>
            </FlexColumn>
            <FlexColumn>
              <label htmlFor="tester2" style={{ color: "#483f3f" }}>
                <b>Second tester: </b>
              </label>
              <FormSelect
                name="tester2"
                value={userTester2}
                onChange={(event) => setUserTester2(event.target.value)}
              >
                {users.map(({ username, _id }) => (
                  <FormOption value={username} key={_id}>
                    {username}
                  </FormOption>
                ))}
              </FormSelect>
            </FlexColumn>
          </div>
          <AddNewTaskFormButton>Add task</AddNewTaskFormButton>
        </form>
      </AddModalElement>
    );
  }
);

export default AddNewModal;

const AddModalElement = styled.dialog`
  background-color: antiquewhite;
  width: 30vw;
  top: 25%;
  border: 1px solid grey;
  border-radius: 10px;
  position: fixed;
  z-index: 1;
`;
const CloseAddModal = styled.button`
  background: none;
  padding: 5px;
  position: absolute;
  right: 3%;
  top: 3%;
  &:hover {
    border: 2px solid #39d05c;
  }
`;
const ModalTitle = styled.h3`
  margin-top: 2px;
  text-align: center;
  font-style: italic;
  font-weight: 500;
  text-shadow: 1px 2px 3px #504e4e;
`;
const FormInput = styled.input`
  border: none;
  border-bottom: 1px solid grey;
  background: none;
`;
const FormTextArea = styled.textarea`
  resize: none;
  scrollbar-width: none;
  border: none;
  border-bottom: 1px solid grey;
  background: none;
`;
const FormSelect = styled.select`
  width: 100%;
  text-align: start;
  border: none;
  border-bottom: 1px solid grey;
  background: none;
`;
const FormOption = styled.option`
  background: #fffaf4;
`;
const AddNewTaskFormButton = styled.button`
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
  align-self: center;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
