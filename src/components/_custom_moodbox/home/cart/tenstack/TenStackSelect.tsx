import { Select, SelectContent, SelectTrigger, SelectValue } from '../../../ui/select';
import { ReactNode } from 'react';
import { TenStackFormBase, FormControlProps } from './TenStackFormBase';
import { useFieldContext } from './tenStackHooks';

export function TenStackSelect({ children, ...props }: FormControlProps & { children: ReactNode }) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<TenStackFormBase {...props}>
			<Select onValueChange={(e) => field.handleChange(e)} value={field.state.value}>
				<SelectTrigger aria-invalid={isInvalid} id={field.name} onBlur={field.handleBlur}>
					<SelectValue placeholder={props.placeholder} />
				</SelectTrigger>
				<SelectContent>{children}</SelectContent>
			</Select>
		</TenStackFormBase>
	);
}
