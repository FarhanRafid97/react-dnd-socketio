import { cn } from '@/lib/utils';
import { ReactNode, forwardRef } from 'react';

type ContainerTaskProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'div'>;

const ContainerTask: React.FC<ContainerTaskProps> = forwardRef<HTMLDivElement, ContainerTaskProps>(
  ({ children, className: c, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn('border p-[8px] mb-[8px] ', c)}>
        {children}
      </div>
    );
  },
);

ContainerTask.displayName = 'ContainerTask';

export default ContainerTask;
