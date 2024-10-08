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
    const [requiredTime, setRequiredTime] = useState("");

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
          setRequiredTime("1");
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.stopPropagation();
      event.preventDefault();

      if (todoTasks.length >= 7) {
        alert("You can't have more than 7 tasks in To do column!");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user")!).email;

      try {
        const reqBody = JSON.stringify({
          task: {
            title,
            description,
            taskType,
            priority,
            requiredTime,
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
        <AddForm onSubmit={handleSubmit}>
          <FlexColumn>
            <Label htmlFor="title">
              <b>Title: </b>
            </Label>
            <FormInput
              type="text"
              name="title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></FormInput>
          </FlexColumn>

          <FlexColumn>
            <Label htmlFor="description">
              <b>Description: </b>
            </Label>
            <FormTextArea
              name="description"
              required
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></FormTextArea>
          </FlexColumn>
          <Container>
            <FlexColumn>
              <Label htmlFor="taskType">
                <b>Type: </b>
              </Label>
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
              <Label htmlFor="priority">
                <b>Priority: </b>
              </Label>
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
          </Container>
          <Container>
            <FlexColumn>
              <Label htmlFor="developer">
                <b>First developer: </b>
              </Label>
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
              <Label htmlFor="tester">
                <b>First tester: </b>
              </Label>
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
          </Container>
          <Container>
            <FlexColumn>
              <Label htmlFor="developer2">
                <b>Second developer: </b>
              </Label>
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
              <Label htmlFor="tester2">
                <b>Second tester: </b>
              </Label>
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
          </Container>
          <FlexColumn>
            <Label htmlFor="requiredTime">
              <b>Required time (in days): </b>
            </Label>
            <FormInput
              type="number"
              name="requiredTime"
              required
              value={requiredTime}
              onChange={(event) => setRequiredTime(event.target.value)}
            ></FormInput>
          </FlexColumn>
          <AddNewTaskFormButton>Add task</AddNewTaskFormButton>
        </AddForm>
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
const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Label = styled.label`
  color: #483f3f;
`;

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
`;
