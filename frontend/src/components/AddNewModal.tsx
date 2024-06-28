import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { User } from "../types/User";
import { Task } from "../types/Task";

const AddNewModal = forwardRef(
  (
    {
      onAddTask,
      onClose,
    }: {
      onAddTask: (Task: Task) => void;
      onClose: () => void;
    },
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
    const [users, setUsers] = useState<User[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
      fetch("http://localhost:5050/api/users")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          console.log(data);
          console.log(users);
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.stopPropagation();
      event.preventDefault();

      const user = JSON.parse(localStorage.getItem("user")!).user;

      try {
        const reqBody = JSON.stringify({
          task: {
            title,
            description,
          },
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <FormInput
            type="text"
            name="title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></FormInput>
          <br />
          <label htmlFor="description">Description: </label>
          <FormTextArea
            name="description"
            required
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></FormTextArea>
          <br />
          <label htmlFor="developer">Developer: </label>
          <FormSelect name="developer">
            {users.map(({ username, _id }) => (
              <FormOption value={username} key={_id}>
                {username}
              </FormOption>
            ))}
          </FormSelect>
          <br />
          <label htmlFor="tester">Tester: </label>
          <FormSelect name="tester">
            {users.map(({ username, _id }) => (
              <FormOption value={username} key={_id}>
                {username}
              </FormOption>
            ))}
          </FormSelect>
          <br />
          <AddNewTaskFormButton>Add task</AddNewTaskFormButton>
        </form>
      </AddModalElement>
    );
  }
);

export default AddNewModal;

const AddModalElement = styled.dialog`
  background-color: antiquewhite;
  height: 40vh;
  width: 30vw;
  top: 25%;
  border: 1px solid grey;
  border-radius: 10px;
  position: fixed;
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
  color: #474747;
  margin-top: 2px;
  text-align: center;
  font-style: italic;
  font-weight: 500;
  text-shadow: 1px 2px 3px #504e4e;
`;
const FormInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid grey;
  background: none;
  margin-bottom: 10px;
`;
const FormTextArea = styled.textarea`
  resize: none;
  scrollbar-width: none;
  width: 100%;
  border: none;
  border-bottom: 1px solid grey;
  background: none;
  margin-bottom: 10px;
`;
const FormSelect = styled.select`
  width: 100%;
  text-align: start;
  border: none;
  border-bottom: 1px solid grey;
  background: none;
  margin-bottom: 10px;
`;
const FormOption = styled.option`
  background: #fffaf4;
`;
const AddNewTaskFormButton = styled.button`
  margin-left: 40%;
  padding: 10px;
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
`;
