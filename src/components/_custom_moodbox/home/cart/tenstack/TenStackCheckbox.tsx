import { TenStackFormBase, FormControlProps } from './TenStackFormBase';
import { useFieldContext } from './tenStackHooks';
import { Checkbox } from '@/components/ui/checkbox'

export function TenStackCheckbox(props: FormControlProps) {
	const field = useFieldContext<boolean>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<TenStackFormBase {...props} controlFirst horizontal>
			<Checkbox
				id={field.name}
				name={field.name}
				checked={field.state.value}
				onBlur={field.handleBlur}
				onCheckedChange={(e) => field.handleChange(e === true)}
				aria-invalid={isInvalid}
				className={`mr-2`}
			/>
		</TenStackFormBase>
	);
}
