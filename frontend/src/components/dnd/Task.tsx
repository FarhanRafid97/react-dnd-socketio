import { FC } from 'react';
import { ITaskBase } from '../../types/list';
import { Draggable } from '@hello-pangea/dnd';
import ContainerTask from '../Base/ContainerTask';
import { cn } from '@/lib/utils';
interface TaskProps {
  task: ITaskBase;
  index: number;
}

const Task: FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, { isDragging }) => {
        return (
          <ContainerTask
            className={cn(isDragging ? 'bg-red-100 text-blue-400 ' : '')}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task.content}
          </ContainerTask>
        );
      }}
    </Draggable>
  );
};

export default Task;
