import styled from "styled-components";
import { Task } from "../types/Task";
import { User } from "../types/User";
import { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const EditModal = forwardRef(
  (
    {
      data,
      setEditingTask,
      onClose,
    }: {
      data: Task;
      setEditingTask: (param: Task | null) => void;
      onClose: () => void;
    },
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
    const [users, setUsers] = useState<User[]>([]);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    //const [developer, setDeveloper]=useState(data.developer);

    useEffect(() => {
      fetch("http://localhost:5050/api/users")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          console.log(data);
          console.log(users);
        });
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.stopPropagation();
      event.preventDefault();
      console.log(event);

      return axios
        .patch("http://localhost:5050/api/tasks", {
          task: {
            ...data,
            title,
            description,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("Successful change of the task.");
        })
        .catch((error) => alert(`Change of task failed. Error ${error}`))
        .finally(() => setEditingTask(null));
    }

    return (
      <EditModalElement open id="editModal" ref={ref}>
        <ModalTitle>Edit your task</ModalTitle>
        <CloseEditModal onClick={onClose}>X</CloseEditModal>
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
            {/* <FormOption value="1">1</FormOption>
            <FormOption value="2">2</FormOption>
            <FormOption value="3">3</FormOption>*/}
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
          <EditFormButton>Save changes</EditFormButton>
        </form>
      </EditModalElement>
    );
  }
);

export default EditModal;

const EditModalElement = styled.dialog`
  background-color: antiquewhite;
  height: 40vh;
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
  width: 100%;
  border: none;
  border-bottom: 1px solid grey;
  background: none;
  margin-bottom: 10px;
`;
const ModalTitle = styled.h3`
  color: #474747;
  margin-top: 2px;
  text-align: center;
  font-style: italic;
  font-weight: 500;
  text-shadow: 1px 2px 3px #504e4e;
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
const EditFormButton = styled.button`
  margin-left: 40%;
  padding: 10px;
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
`;
