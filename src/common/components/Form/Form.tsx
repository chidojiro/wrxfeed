import React from 'react';
import {
  Field,
  FieldProps,
  Form as HeadlessFrom,
  FormProps as HeadlessFormProps,
} from '../../headless';
import { Input, InputProps } from '../Input';
import { TagsSelect, TagsSelectProps } from '../TagsSelect';

export type FormProps = HeadlessFormProps;

export const Form = (props: FormProps) => <HeadlessFrom {...props} />;

type FormField<T> = Omit<FieldProps, 'component'> & Omit<T, keyof FieldProps>;

const FormInput = (props: FormField<InputProps>) => <Field {...props} component={Input} />;

const FormTagsSelect = React.forwardRef((props: FormField<TagsSelectProps>, ref: any) => (
  <Field {...props} component={TagsSelect as any} emptyValue={[]} ref={ref} />
));
FormTagsSelect.displayName = 'FormTagsSelect';

Form.Input = FormInput;
Form.TagsSelect = FormTagsSelect;
