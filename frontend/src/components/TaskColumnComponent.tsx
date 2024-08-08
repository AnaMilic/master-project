import styled from "styled-components";
import { forwardRef } from "react";

const TaskColumnComponent = forwardRef(
  (
    {
      id,
      onDragOver,
      onDrop,
      children,
      borderTopColor,
    }: {
      id: string;
      onDragOver: React.DragEventHandler<HTMLDivElement>;
      onDrop: React.DragEventHandler<HTMLDivElement>;
      children: React.ReactNode;
      borderTopColor: string;
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => (
    <TaskColumn
      ref={ref}
      id={id}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{ borderTopColor }}
    >
      {children}
    </TaskColumn>
  )
);

export default TaskColumnComponent;

const TaskColumn = styled.div`
  width: 20%;
  border-radius: 10px;
  height: 90%;
  background: #f2e8c4;
  box-shadow: 5px 10px 20px #504e4e;
  border-top-style: outset;
  border-top-width: 10px;
  margin: 2%;
  overflow-y: scroll;
  scrollbar-width: none;
`;
