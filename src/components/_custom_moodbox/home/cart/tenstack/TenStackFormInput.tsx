import { Input } from '../../../ui/input';
import { TenStackFormBase, FormControlProps } from './TenStackFormBase';
import { useFieldContext } from './tenStackHooks';

export function TenStackFormInput(props: FormControlProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<TenStackFormBase {...props}>
			<Input
				placeholder={props.placeholder}
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				aria-invalid={isInvalid}
				type={props.type}
			/>
		</TenStackFormBase>
	);
}
