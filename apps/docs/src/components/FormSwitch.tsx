import { useMemo } from "react";

import { cn } from "./../utilities";

import FormFieldWrapper from "./FormFieldWrapper";
import Text from "./Text";

import "./ToggleSwitch.css";

type FieldError = {
  message: string;
};

type DiscriminatedTitleProps<
  TOnValue = true,
  TOffValue = false,
  TValue = TOnValue | TOffValue
> =
  | {
      title: string | ((value: NoInfer<TValue>) => string);
      description?: string | ((value: NoInfer<TValue>) => string);
      contained?: boolean;
      switchPosition?: "trailing" | "leading";
    }
  | {
      title?: never;
      description?: never;
      contained?: never;
      switchPosition?: never;
    };

type DiscriminatedInlineProps<
  TOnValue = true,
  TOffValue = false,
  TValue = TOnValue | TOffValue
> =
  | {
      inline: true;
    }
  | {
      inline?: never;
      label?: string | ((value: NoInfer<TValue>) => string);
      optional?: boolean;
      helpText?: string;
    };

type Props<
  TOnValue = true,
  TOffValue = false,
  TValue = TOnValue | TOffValue
> = {
  name?: string;
  value: TValue;
  onChange: (value: NoInfer<TValue>) => void;
  testId?: string;
  onValue?: TOnValue;
  offValue?: TOffValue;
  readOnly?: boolean;
  error?: FieldError;
} & DiscriminatedTitleProps<TOnValue, TOffValue, TValue> &
  DiscriminatedInlineProps<TOnValue, TOffValue, TValue>;

function FormSwitch<const TOnValue, const TOffValue>({
  name,
  value,
  onChange,
  onValue: onV,
  offValue: offV,
  readOnly,
  testId,
  title,
  description,
  contained = false,
  switchPosition = "leading",
  error,
  ...rest
}: Props<TOnValue, TOffValue>) {
  const onValue = onV ?? true;
  const offValue = offV ?? false;
  const isLeading = switchPosition === "leading";

  const label = useMemo(() => {
    if (rest.inline) return undefined;
    return typeof rest.label === "function" ? rest.label(value) : rest.label;
  }, [rest]);

  return (
    <FormFieldWrapper
      name={name}
      error={error}
      // @ts-expect-error dynamic label
      label={label}
      readOnly={readOnly}
      {...rest}
    >
      <div
        className={cn(
          "flex w-full items-center",
          contained && "rounded border bg-interface px-4 py-3",
          isLeading ? "space-x-3" : "flex-row-reverse justify-between"
        )}
      >
        <div className={cn("toggle-switch")}>
          <input
            id={`id-${name}`}
            data-test-id={testId}
            type="checkbox"
            checked={value === onValue}
            // @ts-expect-error dynamic value
            onChange={(e) => onChange(e.target.checked ? onValue : offValue)}
          />
          <label htmlFor={`id-${name}`} />
        </div>
        {title ? (
          <div className="flex flex-col space-y-1">
            <Text weight="medium" size="body" className="text">
              {typeof title === "function" ? title(value) : title}
            </Text>
            {description && (
              <Text weight="normal" size="caption" className="text-subtle">
                {typeof description === "function"
                  ? description(value)
                  : description}
              </Text>
            )}
          </div>
        ) : null}
      </div>
    </FormFieldWrapper>
  );
}

export default FormSwitch;
