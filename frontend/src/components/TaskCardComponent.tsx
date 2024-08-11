import {
  faEdit,
  faTrashCan,
  faBug,
  faPen,
  faSquarePlus,
  faTicket,
  faTriangleExclamation,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { User } from "../types/User";

const TaskCardComponent = ({
  id,
  title,
  description,
  taskType,
  priority,
  userDeveloper,
  userTester,
  userDeveloper2,
  userTester2,
  onDragStart,
  onEditClick,
  onDeleteClick,
}: {
  id: string;
  title: string;
  description: string | undefined;
  taskType: string;
  priority: string;
  userDeveloper: User;
  userTester: User;
  userDeveloper2: User;
  userTester2: User;
  onDragStart: React.DragEventHandler<HTMLDivElement>;
  onEditClick: () => void;
  onDeleteClick: () => void;
}) => {
  const renderIcon = () => {
    switch (priority) {
      case "1":
        return (
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            style={{ color: "red" }}
          />
        );
      case "2":
        return (
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            style={{ color: "orange" }}
          />
        );
      case "3":
        return (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            style={{ color: "#f8d564" }}
          />
        );
      case "4":
        return (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            style={{ color: "#42b883" }}
          />
        );
      case "5":
        return (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            style={{ color: "#228850" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TaskCard id={id} draggable="true" onDragStart={onDragStart}>
      <strong style={{ textDecoration: "underline", fontSize: "large" }}>
        {title}
      </strong>
      <br />
      <StyledSpan>Description: </StyledSpan>
      <span>{description}</span>
      <br />
      <StyledSpan>Type: </StyledSpan>
      <span> {taskType} </span>
      <span>
        {taskType == "bug" ? (
          <FontAwesomeIcon icon={faBug} />
        ) : taskType == "change" ? (
          <FontAwesomeIcon icon={faPen} />
        ) : taskType == "new feature" ? (
          <FontAwesomeIcon icon={faSquarePlus} />
        ) : (
          <FontAwesomeIcon icon={faTicket} />
        )}
      </span>
      <br />
      <StyledSpan>Priority: </StyledSpan>
      <span> {priority} </span>
      <span>{renderIcon()}</span>
      <br />
      <StyledSpan>First developer: </StyledSpan>
      <span>{userDeveloper.username}</span>
      <br />
      <StyledSpan>Second developer: </StyledSpan>
      <span>{userDeveloper2.username}</span>
      <br />
      <StyledSpan>First tester: </StyledSpan>
      <span>{userTester.username}</span>
      <br />
      <StyledSpan>Second tester: </StyledSpan>
      <span>{userTester2.username}</span>
      <Buttons>
        <EditTaskButton onClick={onEditClick}>
          <FontAwesomeIcon icon={faEdit} />
        </EditTaskButton>
        <DeleteTaskButton onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrashCan} />
        </DeleteTaskButton>
      </Buttons>
    </TaskCard>
  );
};

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
  cursor: pointer;
`;
const EditTaskButton = styled.button`
  bottom: 5px;
  right: 40px;
  padding: 5px;
  color: #825516;
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #39d05c;
  }
  width: 28px;
  margin: 2px;
`;
const DeleteTaskButton = styled.button`
  bottom: 5px;
  right: 5px;
  padding: 5px;
  color: #cf3434;
  box-shadow: 2px 4px 7px #504e4e;
  &:hover {
    border: 2px solid #e86a6a;
  }
  width: 28px;
  margin: 2px;
`;
const StyledSpan = styled.span`
  font-style: italic;
  font-weight: bold;
`;
const Buttons = styled.div`
  text-align: right;
`;
