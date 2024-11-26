import { useMemo, useState } from "react";
import { type IconType } from "react-icons";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { cn } from "./../utilities";

import FormFieldWrapper, {
  type Props as WrapperProps,
} from "./FormFieldWrapper";

type Props = {
  testId?: string;
  value: string;
  icon?: IconType;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  onChange: (value: string) => void;
} & WrapperProps;

function FormPassword({
  name,
  value,
  error,
  icon: Icon,
  disabled = false,
  readOnly = false,
  testId = undefined,
  maxLength = undefined,
  placeholder = undefined,
  onChange,
  ...rest
}: Props) {
  const [inputType, setInputType] = useState("password");

  const hasIcon = useMemo(() => Boolean(Icon), [Icon]);

  const toggleHideUnhidePassword = () => {
    if (inputType === "password") setInputType("text");
    else setInputType("password");
  };

  return (
    <FormFieldWrapper name={name} error={error} readOnly={readOnly} {...rest}>
      <div className="relative w-full">
        {Icon ? (
          <Icon
            className={cn(
              "absolute left-[0.625rem] top-1/2 h-[0.875rem] w-[0.875rem] -translate-y-1/2 text-subtle",
              disabled ? "text-disabled" : "",
              error ? "text-onDanger-subtle" : ""
            )}
          />
        ) : null}
        <input
          id={name}
          type={inputType}
          data-test-id={testId}
          value={value}
          className={cn(
            "h-9 w-full rounded border bg-white p-[0.5625rem] text-sm leading-4 text placeholder:text-placeholder",
            "focus:outline-none disabled:bg-interface-disabled ",
            "[&:not(:disabled)]:read-only:border-none [&:not(:disabled)]:read-only:bg-white [&:not(:disabled)]:read-only:px-0 [&:not(:disabled)]:read-only:pt-1.5 ",
            hasIcon ? "pl-[1.6rem]" : "",
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
        <button
          tabIndex={-1}
          type="button"
          className={cn(
            "absolute right-[0.625rem] top-1/2 -translate-y-1/2 text-icon-subtle",
            error
              ? "text-onDanger-subtle"
              : "text-subtle hover:text-onBrand-subtle"
          )}
          onClick={toggleHideUnhidePassword}
        >
          {inputType === "password" ? (
            <AiFillEyeInvisible className="h-[0.875rem] w-[0.875rem]" />
          ) : (
            <AiFillEye className="h-[0.875rem] w-[0.875rem]" />
          )}
        </button>
      </div>
    </FormFieldWrapper>
  );
}

export default FormPassword;
