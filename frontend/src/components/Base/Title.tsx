import { cn } from '@/lib/utils';
import { ReactNode, forwardRef } from 'react';

type TitleProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'h3'>;

const Title: React.FC<TitleProps> = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children, className: c, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn('p-[8px]', c)} {...props}>
        {children}
      </h3>
    );
  },
);

Title.displayName = 'Title';
export default Title;
