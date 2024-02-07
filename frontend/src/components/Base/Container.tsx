import { cn } from '@/lib/utils';
import { ReactNode, forwardRef } from 'react';

type ContainerProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'div'>;

const Container: React.FC<ContainerProps> = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className: c, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn('m-[8px] border rounded-sm', c)}>
        {children}
      </div>
    );
  },
);

Container.displayName = 'Container';

export default Container;
