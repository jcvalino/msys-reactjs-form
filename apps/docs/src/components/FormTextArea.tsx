import { type IconType } from "react-icons";

import { cn } from "./../utilities";

import FormFieldWrapper, {
  type Props as WrapperProps,
} from "./FormFieldWrapper";

type Props = {
  rows?: number;
  testId?: string;
  icon?: IconType;
  value: string;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  onChange: (value: string) => void;
} & WrapperProps;

function FormTextArea({
  name,
  value,
  error,
  rows = 3,
  disabled = false,
  readOnly = false,
  testId = undefined,
  maxLength = undefined,
  placeholder = undefined,
  onChange,
  ...rest
}: Props) {
  return (
    <FormFieldWrapper name={name} error={error} readOnly={readOnly} {...rest}>
      <textarea
        id={name}
        data-test-id={testId}
        value={value}
        rows={rows}
        className={cn(
          "min-h-9 w-full rounded border bg-white p-[0.5625rem] text-sm leading-4 text placeholder:text-placeholder",
          "focus:outline-none disabled:bg-interface-disabled",
          "[&:not(:disabled)]:read-only:border-none [&:not(:disabled)]:read-only:bg-white [&:not(:disabled)]:read-only:px-0 [&:not(:disabled)]:read-only:pt-1.5 ",
          error
            ? "border-danger-subtle bg-danger-subtle text-onDanger-subtle"
            : "focus:border-selected"
        )}
        onChange={(e) => {
          const { value } = e.target;
          if (typeof onChange === "function") onChange(value);
        }}
        placeholder={readOnly ? "-" : placeholder}
        disabled={readOnly ? false : disabled}
        readOnly={readOnly}
        maxLength={maxLength}
      />
    </FormFieldWrapper>
  );
}

export default FormTextArea;
