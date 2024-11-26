import { useMemo } from 'react';
import { type IconType } from 'react-icons';

import { cn } from './../utilities';

import FormFieldWrapper, {
  type Props as WrapperProps,
} from './FormFieldWrapper';

type Props = {
  testId?: string;
  icon?: IconType;
  value: string;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  type?: 'text' | 'email';
  onChange: (value: string) => void;
} & WrapperProps;

function FormInput({
  name,
  value,
  error,
  icon: Icon,
  type = 'text',
  disabled = false,
  readOnly = false,
  testId = undefined,
  maxLength = undefined,
  placeholder = undefined,
  onChange,
  ...rest
}: Props) {
  const hasIcon = useMemo(() => Boolean(Icon), [Icon]);
  return (
    <FormFieldWrapper name={name} error={error} readOnly={readOnly} {...rest}>
      <div className="relative w-full">
        {Icon ? (
          <Icon
            className={cn(
              'absolute left-[0.5625rem] top-1/2 h-[0.875rem] w-[0.875rem] -translate-y-1/2 text-subtle',
              disabled ? 'text-disabled' : '',
              error ? 'text-onDanger-subtle' : ''
            )}
          />
        ) : null}
        <input
          id={name}
          type={type}
          data-test-id={testId}
          value={value}
          className={cn(
            'h-9 w-full rounded border bg-white p-[0.5625rem] text-sm leading-4 text placeholder:text-placeholder',
            'focus:outline-none disabled:bg-interface-disabled ',
            '[&:not(:disabled)]:read-only:border-none [&:not(:disabled)]:read-only:bg-transparent [&:not(:disabled)]:read-only:px-0 [&:not(:disabled)]:read-only:pt-1.5 ',
            hasIcon ? 'pl-[1.6rem]' : '',
            error
              ? 'border-danger-subtle bg-danger-subtle text-onDanger-subtle'
              : 'focus:border-selected'
          )}
          onChange={(e) => {
            const { value } = e.target;
            if (typeof onChange === 'function') onChange(value);
          }}
          placeholder={readOnly ? '-' : placeholder}
          disabled={readOnly ? false : disabled}
          readOnly={readOnly}
          maxLength={maxLength}
        />
      </div>
    </FormFieldWrapper>
  );
}

export default FormInput;
