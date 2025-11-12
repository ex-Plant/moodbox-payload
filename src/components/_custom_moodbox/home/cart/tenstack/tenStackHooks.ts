import { TenStackCheckbox } from './TenStackCheckbox';
import { TenStackFormInput } from './TenStackFormInput';
import { TenStackSelect } from './TenStackSelect';
import { TenStackTextarea } from './TenStackTextarea';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldComponents: {
		Input: TenStackFormInput,
		Textarea: TenStackTextarea,
		Select: TenStackSelect,
		Checkbox: TenStackCheckbox,
	},
	formComponents: {},
	fieldContext,
	formContext,
});

export { useAppForm, useFieldContext, useFormContext };
