import { type ReactNode } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from './../utilities';

type NonNullableProps<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

const StackStyles = cva('flex', {
  variants: {
    width: {
      auto: 'w-auto',
      full: 'w-full',
      fit: 'w-fit',
    },
    height: {
      auto: 'h-auto',
      full: 'h-full',
      fit: 'h-fit',
    },
    horizontal: {
      true: 'flex-row',
      false: 'flex-col',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
    align: {
      start: 'content-start items-start',
      center: 'content-center items-center',
      end: 'content-end items-end',
      baseline: 'items-baseline',
    },
    distribute: {
      between: 'justify-between content-between',
      around: 'justify-around content-around',
      evenly: 'justify-evenly content-evenly',
      stretch: '*:flex-grow justify-stretch content-stretch',
    },
    gap: {
      2: 'gap-0.5',
      4: 'gap-1',
      6: 'gap-[0.375rem]',
      8: 'gap-2',
      10: 'gap-[0.625rem]',
      12: 'gap-3',
      14: 'gap-[0.875rem]',
      16: 'gap-4',
      18: 'gap-[1.125rem]',
      20: 'gap-5',
      24: 'gap-6',
      28: 'gap-7',
      32: 'gap-8',
      40: 'gap-10',
      60: 'gap-[3.75rem]',
    },
  },
});

type StackCVAProps = NonNullableProps<VariantProps<typeof StackStyles>>;

interface StackProps extends StackCVAProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'main';
  horizontal?: boolean;
}

const Stack = ({
  as: Component = 'div',
  horizontal = false, //default direction is vertical
  width = 'auto',
  height,
  justify,
  align,
  gap,
  distribute,
  children,
  className,
  ...props
}: StackProps) => {
  const styles = cn(
    StackStyles({
      horizontal,
      width,
      height,
      justify,
      align,
      gap,
      distribute,
    }),
    className
  );

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
};

export default Stack;
