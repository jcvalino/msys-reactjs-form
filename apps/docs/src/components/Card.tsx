import { Fragment } from 'react';

import { cn } from './../utilities';

type Props = {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  headerActionElements?: JSX.Element[];
  actionElements?: JSX.Element[];
};

const Card = ({
  title,
  description,
  children,
  className,
  bodyClassName,
  actionElements,
  headerActionElements,
}: Props) => {
  return (
    <div
      className={cn(
        'bg-interface h-max space-y-4 rounded border py-5 shadow',
        className
      )}
    >
      {(Boolean(title) ||
        Boolean(description) ||
        Boolean(headerActionElements)) && (
        <section className="flex justify-between px-5">
          <dl className="space-y-1">
            {Boolean(title) && (
              <dt className="text-lg font-semibold leading-5">{title}</dt>
            )}
            {Boolean(description) && (
              <dd className="text-subtle text-xs leading-[0.875rem]">
                {description}
              </dd>
            )}
          </dl>
          {Boolean(headerActionElements) && (
            <div className="ml-auto flex space-x-1">
              {headerActionElements!.map((el, i) => (
                <Fragment key={i}>{el}</Fragment>
              ))}
            </div>
          )}
        </section>
      )}
      <section className={cn('px-5', bodyClassName)}>{children}</section>
      {Boolean(actionElements) && (
        <section className="flex space-x-1 px-5">
          {actionElements!.map((el, i) => (
            <Fragment key={i}>{el}</Fragment>
          ))}
        </section>
      )}
    </div>
  );
};

export default Card;
