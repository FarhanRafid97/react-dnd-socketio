import { cn } from '@/lib/utils';
import { ReactNode, forwardRef } from 'react';

type TaskListProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'div'>;

const TaskList: React.FC<TaskListProps> = forwardRef<HTMLDivElement, TaskListProps>(
  ({ children, className: c, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn('border p-[8px] mb-[8px]', c)}>
        {children}
      </div>
    );
  },
);

TaskList.displayName = 'TaskList';

export default TaskList;
