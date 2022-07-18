import React from 'react';
import {
  Field,
  FieldProps,
  Form as HeadlessFrom,
  FormProps as HeadlessFormProps,
} from '../../headless';
import { Input, InputProps } from '../Input';
import { TagsDropdown, TagsDropdownProps } from '../TagsDropdown';

export type FormProps = HeadlessFormProps;

export const Form = (props: FormProps) => <HeadlessFrom {...props} />;

type FormField<T> = Omit<FieldProps, 'component'> & Omit<T, keyof FieldProps>;

const FormInput = (props: FormField<InputProps>) => <Field {...props} component={Input} />;

const FormTagsDropdown = React.forwardRef((props: FormField<TagsDropdownProps>, ref: any) => (
  <Field {...props} component={TagsDropdown as any} emptyValue={[]} ref={ref} />
));
FormTagsDropdown.displayName = 'FormTagsDropdown';

Form.Input = FormInput;
Form.TagsDropdown = FormTagsDropdown;
