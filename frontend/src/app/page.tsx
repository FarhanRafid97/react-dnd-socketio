'use client';

import Column from '@/components/dnd/Column';
import { initialData } from '@/data/initialData';
import { socket } from '@/lib/socket';
import { InitialDataInf } from '@/types/list';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

export type TMessageNewTask = { column: string; task: string };
const App = () => {
  const searchParams = useSearchParams();

  const roomId = searchParams.get('roomId');

  const [listTask, setListTask] = useState<InitialDataInf>(() => initialData);

  const handleNewTask = ({ msg }: { msg: TMessageNewTask }) => {
    setListTask((prev) => {
      const column = prev.columns[msg.column];
      const numberOfKeys = Object.keys(prev.tasks).length;
      const newTaskId = `task-${numberOfKeys + 1}`;
      const newDataColumn = [...column.taskIds, newTaskId];

      return {
        tasks: {
          ...prev.tasks,
          [newTaskId]: { content: msg.task, id: newTaskId },
        },
        columns: {
          ...prev.columns,
          [msg.column]: {
            ...column,
            taskIds: newDataColumn,
          },
        },
        columnOrder: prev.columnOrder,
      };
    });
  };
  const handlerTask = (result: DropResult) => {
    const { destination, draggableId, source, type } = result;

    if (!destination) {
      return;
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    if (type === 'COLUMN') {
      setListTask((prev) => {
        const column = Array.from(prev.columnOrder);

        column.splice(source.index, 1);
        column.splice(destination.index, 0, draggableId);

        return {
          ...prev,
          columnOrder: column,
        };
      });
      return;
    }

    setListTask((prev) => {
      const column = prev.columns[source.droppableId];
      const destinationCol = prev.columns[destination.droppableId];
      if (destination.droppableId !== source.droppableId) {
        const oldTask = Array.from(column.taskIds);
        const desTask = Array.from(destinationCol.taskIds);

        oldTask.splice(source.index, 1);
        desTask.splice(destination.index, 0, draggableId);
        const sourceColumn = {
          ...column,
          taskIds: oldTask,
        };
        const destionationColumn = {
          ...destinationCol,
          taskIds: desTask,
        };
        const returnData = {
          ...prev,
          columns: {
            ...prev.columns,
            [column.id]: sourceColumn,
            [destinationCol.id]: destionationColumn,
          },
        };
        return returnData;
      }

      const newTask = Array.from(column.taskIds);
      newTask.splice(source.index, 1);
      newTask.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTask,
      };
      const returnData = {
        ...prev,
        columns: {
          ...prev.columns,
          [column.id]: newColumn,
        },
      };

      return returnData;
    });
  };

  useEffect(() => {
    let isValidScope = true;
    socket.on('new_task', (msg: TMessageNewTask) => {
      if (!isValidScope) {
        return;
      }
      handleNewTask({ msg });
    });
    return () => {
      // cleanup code, disconnect
      // socket.disconnect()
      isValidScope = false;
    };
  }, []);
  useEffect(() => {
    let isValidScope = true;
    socket.on('receive_edit_task', (result: DropResult) => {
      if (!isValidScope) {
        return;
      }

      handlerTask(result);
    });

    return () => {
      // cleanup code, disconnect
      // socket.disconnect()
      isValidScope = false;
    };
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.emit('join_room', { roomId });
    }
    socket.emit('new-task', { test: 'tea' });
    socket.on('test', (data) => {
      console.log(data);
    });

    return () => {
      socket.emit('leave-room', { roomId });
    };
  }, [roomId]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <DragDropContext
        onDragEnd={(e) => {
          handlerTask(e);

          socket.emit('send_edit_task', { data: e, roomId });
        }}
      >
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provider) => (
            <div ref={provider.innerRef} {...provider.droppableProps} className="grid grid-cols-3">
              {listTask.columnOrder.map((columnId, idx) => {
                const column = listTask.columns[columnId];
                const tasks = column.taskIds.map((taskIds) => listTask.tasks[taskIds]);

                return (
                  <Column
                    key={columnId}
                    roomId={roomId}
                    column={column}
                    handlerAddTask={handleNewTask}
                    columnId={columnId}
                    tasks={tasks}
                    index={idx}
                  />
                );
              })}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Suspense>
  );
};

export default App;
