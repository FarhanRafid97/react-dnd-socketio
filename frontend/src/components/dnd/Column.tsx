import { Draggable, Droppable } from '@hello-pangea/dnd';
import { FC, useRef } from 'react';
import { IColumnBase, ITaskBase } from '../../types/list';
import Container from '../Base/Container';
import TaskList from '../Base/TaskList';
import Title from '../Base/Title';
import Task from './Task';
import { socket } from '@/lib/socket';
import { TMessageNewTask } from '@/app/page';

interface ColumnProps {
  column: IColumnBase;
  index: number;
  roomId: string | null;
  columnId: string;
  tasks: ITaskBase[];
  // eslint-disable-next-line no-unused-vars
  handlerAddTask: ({ msg }: { msg: TMessageNewTask }) => void;
}

const Column: FC<ColumnProps> = ({ column, tasks, index, roomId, handlerAddTask }) => {
  const refInput = useRef<HTMLInputElement>(null);
  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`h-fit ${snapshot.isDragging ? 'bg-red-100' : ''}`}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable key={column.id} droppableId={column.id}>
            {({ droppableProps, placeholder, innerRef }) => (
              <TaskList ref={innerRef} {...droppableProps} className="min-h-[30px]">
                {tasks.map((task, index) => (
                  <Task key={task?.id} task={task} index={index} />
                ))}
                {placeholder}
              </TaskList>
            )}
          </Droppable>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (refInput.current?.value) {
                socket.emit('add_new_task', {
                  column: column.id,
                  task: refInput.current?.value,
                  roomId,
                });
                handlerAddTask({ msg: { column: column.id, task: refInput.current?.value } });
                refInput.current.value = '';
              }
            }}
          >
            <input ref={refInput} className="border" type="text" />
            <button className="border" type="submit">
              Submit
            </button>
          </form>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
