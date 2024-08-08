import styled from "styled-components";
import { Task } from "../types/Task";
import { User } from "../types/User";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const EditModal = forwardRef(
  (
    {
      data,
      onClose,
    }: {
      data: Task;
      onClose: () => void;
    },
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
    const [users, setUsers] = useState<User[]>([]);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [taskType, setTaskType] = useState(data.type);
    const [priority, setPriority] = useState(data.priority);
    const [userDeveloper, setUserDeveloper] = useState(data.userDeveloper);
    const [userTester, setUserTester] = useState(data.userTester);

    useEffect(() => {
      fetch("http://localhost:5050/api/users")
        .then((response) => response.json())
        .then((data: User[]) => {
          setUsers(data);
        });
    }, []);

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation();
      event.preventDefault();

      return axios
        .patch("http://localhost:5050/api/tasks", {
          task: {
            ...data,
            title,
            description,
            type: taskType,
            priority,
            userDeveloper,
            userTester,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("Successful change of the task.");
        })
        .catch((error) => alert(`Change of task failed. Error ${error}`));
    }

    function replaceDeveloperAndTester(
      event: React.MouseEvent<HTMLButtonElement>
    ) {
      event.stopPropagation();
      event.preventDefault();

      return axios
        .patch("http://localhost:5050/api/tasks", {
          task: {
            ...data,
            title,
            description,
            type: taskType,
            priority,
            userDeveloper: userTester,
            userTester: userDeveloper,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("Successful replace of developer and tester.");
        })
        .catch((error) =>
          alert(`Replace of developer and tester failed. Error ${error}`)
        );
    }

    return (
      <EditModalElement open id="editModal" ref={ref}>
        <ModalTitle>Edit your task</ModalTitle>
        <CloseEditModal onClick={onClose}>X</CloseEditModal>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <FlexColumn>
            <label htmlFor="title">Title:</label>
            <FormInput
              type="text"
              name="title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FlexColumn>
          <FlexColumn>
            <label htmlFor="description">Description: </label>
            <FormTextArea
              name="description"
              required
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FlexColumn>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <FlexColumn>
              <label htmlFor="taskType">Type:</label>
              <FormSelect
                name="taskType"
                value={taskType}
                onChange={(event) => setTaskType(event.target.value)}
              >
                <FormOption value="new feature">New feature</FormOption>
                <FormOption value="change">Change</FormOption>
                <FormOption value="bug">Bug</FormOption>
                <FormOption value="other">Other</FormOption>
              </FormSelect>
            </FlexColumn>
            <FlexColumn>
              <label htmlFor="priority">Priority:</label>
              <FormSelect
                name="priority"
                value={priority}
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

          <div>
            <label htmlFor="developer">Developer: </label>
            <FormSelect
              name="developer"
              value={userDeveloper._id}
              onChange={(event) =>
                setUserDeveloper(
                  users.find((usr) => usr._id === event.target.value)!
                )
              }
            >
              {users.map(({ username, _id }) => (
                <FormOption value={_id} key={_id}>
                  {username}
                </FormOption>
              ))}
            </FormSelect>
          </div>
          <div>
            <label htmlFor="tester">Tester: </label>
            <FormSelect
              name="tester"
              value={userTester._id}
              onChange={(event) =>
                setUserTester(
                  users.find((usr) => usr._id === event.target.value)!
                )
              }
            >
              {users.map(({ username, _id }) => (
                <FormOption value={_id} key={_id}>
                  {username}
                </FormOption>
              ))}
            </FormSelect>
          </div>
          <Buttons>
            <ReplaceButton
              onClick={(event) => {
                replaceDeveloperAndTester(event);
              }}
            >
              Replace developer and tester
            </ReplaceButton>
            <EditFormButton
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Save changes
            </EditFormButton>
          </Buttons>
        </form>
      </EditModalElement>
    );
  }
);

export default EditModal;

const EditModalElement = styled.dialog`
  background-color: antiquewhite;
  width: 30vw;
  top: 25%;
  border: 1px solid grey;
  border-radius: 10px;
  position: fixed;
  z-index: 1;
`;
const CloseEditModal = styled.button`
  background: none;
  padding: 5px;
  position: absolute;
  right: 3%;
  top: 3%;
  &:hover {
    border: 2px solid #39d05c;
  }
`;
const FormInput = styled.input`
  border: none;
  border-bottom: 1px solid grey;
  background: none;
`;
const ModalTitle = styled.h3`
  margin-top: 2px;
  text-align: center;
  font-style: italic;
  font-weight: 500;
  text-shadow: 1px 2px 3px #504e4e;
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
const Buttons = styled.div`
  text-align: center;
`;
const EditFormButton = styled.button`
  padding: 10px;
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
  margin: 10px 0px 0px 10px;
`;
const ReplaceButton = styled.button`
  padding: 10px;
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
  margin: 10px 10px 0px 0px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
