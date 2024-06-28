import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const TaskCardComponent = ({
  id,
  title,
  description,
  onDragStart,
  onEditClick,
  onDeleteClick,
}: {
  id: string;
  title: string;
  description: string | undefined;
  onDragStart: React.DragEventHandler<HTMLDivElement>;
  onEditClick: () => void;
  onDeleteClick: () => void;
}) => (
  <TaskCard id={id} draggable="true" onDragStart={onDragStart}>
    <span>{title}</span>
    <br></br>
    <span>{description}</span>

    <EditTaskButton onClick={onEditClick}>
      <FontAwesomeIcon icon={faEdit} />
    </EditTaskButton>
    <DeleteTaskButton onClick={onDeleteClick}>
      <FontAwesomeIcon icon={faTrashCan} />
    </DeleteTaskButton>
  </TaskCard>
);

export default TaskCardComponent;

const TaskCard = styled.div`
  background-color: antiquewhite;
  margin: 5px;
  border: 0.1rem solid grey;
  border-radius: 0.2rem;
  padding: 5px;
  overflow-wrap: break-word;
  min-height: 10%;
  position: relative;
`;
const EditTaskButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 40px;
  padding: 5px;
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
  width: 28px;
`;
const DeleteTaskButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px;
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #e86a6a;
  }
  width: 28px;
`;
