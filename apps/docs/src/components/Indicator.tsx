import { cva } from 'class-variance-authority';
import { cn } from './../utilities';

const IndicatorStyle = cva('aspect-square rounded-full', {
  variants: {
    size: {
      sm: 'w-[0.375rem]',
      default: 'w-2',
      md: 'w-[0.625rem]',
      lg: 'w-4',
    },
    status: {
      neutral: 'bg-status-neutral',
      success: 'bg-status-success',
      warning: 'bg-status-warning',
      danger: 'bg-status-danger',
    },
  },
});

export type IndicatorProps = {
  size?: 'sm' | 'md' | 'lg';
  status: 'neutral' | 'success' | 'danger' | 'warning';
  className?: string;
};

const Indicator = ({ size, status, className }: IndicatorProps) => {
  const style = IndicatorStyle({ size: size ? size : 'default', status });

  return <div className={cn(style, className)} />;
};

export default Indicator;
