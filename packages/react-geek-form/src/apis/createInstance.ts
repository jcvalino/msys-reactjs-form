import { z } from "zod";
import { type FieldPath } from "react-hook-form";
import React, { type ForwardRefExoticComponent } from "react";

import type {
  UnionToArray,
  MakePropertyOptional,
  FindErrorFieldIndexes,
} from "../utils";
import createForm, { type ValidSchema } from "./createForm";

type FormFieldComponent = (props: any) => JSX.Element;

const createInstance = <
  const TWrappedFormFields extends {
    [fieldName: string]: FormFieldComponent | ForwardRefExoticComponent<any>;
  },
  TWrappedFormFieldArray = UnionToArray<
    {
      [FieldName in keyof TWrappedFormFields]: {
        name: FieldName;
        component: TWrappedFormFields[FieldName];
      };
    }[keyof TWrappedFormFields]
  >,
  // @ts-expect-error
  TErrorFieldIndexes = FindErrorFieldIndexes<TWrappedFormFieldArray>
>(
  fieldComponents: TWrappedFormFields & {
    [K in keyof (TErrorFieldIndexes extends never
      ? { errorFields?: any }
      : { errorFields: any }) as K extends "errorFields"
      ? K
      : never]: TErrorFieldIndexes extends number
      ? // @ts-expect-error
        TWrappedFormFieldArray[TErrorFieldIndexes]["name"]
      : never;
  }
) => {
  const cF = <TSchema extends ValidSchema>({
    zodSchema,
  }: {
    zodSchema: TSchema;
  }) => {
    type InferedSchema = z.infer<TSchema>;
    const form = createForm({ zodSchema });
    type RegisteredFieldsEntries = {
      [FormFieldName in keyof TWrappedFormFields]: {
        name: FormFieldName;
        component: TWrappedFormFields[FormFieldName];
      };
    };

    type RegisteredFields = {
      [FormField in RegisteredFieldsEntries[keyof RegisteredFieldsEntries] as FormField extends any
        ? FormField["name"]
        : never]: <
        TNoStrict extends boolean = false,
        TOmittedProps = (React.ComponentProps<FormField["component"]> & {
          value: never;
          error: never;
        }) & {
          name: string;
          onChange?: React.ComponentProps<FormField["component"]>["onChange"];
        }
      >(
        props: TOmittedProps & {
          [K in keyof TOmittedProps]: K extends "name"
            ? TNoStrict extends false
              ? FieldPath<InferedSchema>
              : string
            : TOmittedProps[K];
        } & {
          noStrict?: TNoStrict;
        }
      ) => JSX.Element;
    };

    const registeredFields = Object.keys(fieldComponents)
      .map((fieldName) => ({
        name: fieldName,
        component: fieldComponents[fieldName],
      }))
      .reduce<RegisteredFields>((fields, field) => {
        // @ts-expect-error
        fields[field.name] = form.withFieldContext(field.component);
        return fields;
      }, {} as any);

    return {
      ...form,
      ...registeredFields,
    };
  };

  return {
    createForm: cF,
  };
};

export default createInstance;
