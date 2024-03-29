import React from 'react';
import {
  CheckboxGroup as HeadlessCheckboxGroup,
  CheckboxGroupProps as HeadlessCheckboxGroupProps,
  Field,
  FieldProps,
  Form as HeadlessFrom,
  FormProps as HeadlessFormProps,
} from '../../headless';
import { Input, InputProps } from '../Input';
import { Select, SelectProps } from '../Select';
import { TagsSelect, TagsSelectProps } from '../TagsSelect';

export type FormProps = HeadlessFormProps<any>;

export const Form = (props: FormProps) => <HeadlessFrom {...props} />;

type FormFieldProps<TComponentProps, TValue> = Omit<
  FieldProps<TComponentProps, TValue>,
  'component'
>;

const FormInput = React.forwardRef((props: FormFieldProps<InputProps, string>, ref) => (
  <Field {...props} component={Input} ref={ref} />
));
FormInput.displayName = 'FormInput';

const FormHeadlessCheckboxGroup = React.forwardRef(
  (props: FormFieldProps<HeadlessCheckboxGroupProps, string>) => (
    <Field {...props} component={HeadlessCheckboxGroup} emptyValue={[]} />
  ),
);
FormHeadlessCheckboxGroup.displayName = 'FormHeadlessCheckboxGroup';

const FormTagsSelect = React.forwardRef(
  <TValue,>(props: FormFieldProps<TagsSelectProps<TValue>, TValue[]>, ref: any) => (
    <Field<TagsSelectProps<TValue>, TValue[]>
      {...props}
      component={TagsSelect as any}
      emptyValue={[]}
      ref={ref}
    />
  ),
);
FormTagsSelect.displayName = 'FormTagsSelect';

const FormSelect = React.forwardRef(
  <TValue,>(props: FormFieldProps<SelectProps, TValue[]>, ref: any) => (
    <Field<SelectProps, TValue[]> {...props} component={Select} />
  ),
);
FormSelect.displayName = 'FormSelect';

Form.Input = FormInput;
Form.TagsSelect = FormTagsSelect;
Form.HeadlessCheckboxGroup = FormHeadlessCheckboxGroup;
Form.Select = FormSelect;
