import {
	PROJECT_AREAS,
	PROJECT_BUDGETS,
	PROJECT_STAGES,
	PROJECT_TYPES,
	txt,
} from './temporaryData';
import { SelectItem } from '@/components/ui/select';
import { useAppForm } from '@/lib/hooks/tenStackFormHooks'
import useCart from '@/lib/hooks/useCart'
import { cartSchema, CartSchemaT } from '@/lib/CartSchema'
import { toastMessage, ToastType } from '@/lib/toasts/toasts'
import { Button } from '@/components/ui/button'
import LogoSvg from '@/components/_custom_moodbox/common/Logo'
import { Input } from '@/components/ui/input'
import { Field, FieldError } from '@/components/_custom_moodbox/ui/field'
import { useStore } from '@tanstack/react-form'
import { checkoutA } from '@/app/actions/checkoutA'
import { Tip } from '@/components/_custom_moodbox/ui/Tip'
import { CircleHelp as CircleQuestionMark } from 'lucide-react';
import { cn } from '@/utilities/ui'

export default function CartForm() {
	const { cartItems } = useCart();

	const form = useAppForm({
		defaultValues: {
			company_name: '',
			email: '',
			projects_per_year: '',
			nip: '',
			website: '',
			city: '',
			project_type: '',
			completion_date: '',
			project_stage: '',
			project_area: '',
			project_budget: '',
			consents: {
				consent1: false,
				consent2: false,
			},
		} satisfies CartSchemaT as CartSchemaT,
		validators: {
			onSubmit: cartSchema,
		},
		onSubmit: async (data) => {
			// console.log('🚀 formData: ', data.value);

			const res = await checkoutA(cartItems, data.value);
			console.log('res', res);

			if (res.error) {
				toastMessage(res.message, ToastType.Error);
				console.log('res', res);
				// prevent resetting form
			}
			return false;
		},
	});

	const emptyCart = cartItems.length < 1;
	const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
	const isFormValid = useStore(
		form.store,
		(state) => !state.isValidating && Object.keys(state.errors || {}).length === 0
	);

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className={`relative grid gap-4`}
			>
				<div>
					<header className={`flex items-center`}>
						<h4 className={`text-[18px] font-bold`}>Dane firmowe</h4>
						<Tip content={txt} side={`right`} className={`p-2`}>
							<CircleQuestionMark className={`fill-mood-dark-brown w-5 border-none stroke-white`} />
						</Tip>
					</header>TS2304: Cannot find name CircleQuestionMark
					<div className={`grid gap-4 md:grid-cols-2 xl:mr-4`}>
						<form.AppField name='company_name'>
							{(field) => <field.Input placeholder={'Nazwa firmy / pracowni'} />}
						</form.AppField>

						<form.Field name='nip'>
							{(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<Input
											placeholder={'NIP'}
											inputMode='numeric' // Shows numeric keyboard on mobile
											pattern='[0-9]*' // Ensures only numbers are entered
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											aria-invalid={isInvalid}
											onChange={(e) => {
												// Only allow numbers
												const value = e.target.value.replace(/\D/g, '');
												// Limit to 10 digits
												if (value.length <= 10) {
													field.handleChange(value);
												}
											}}
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						</form.Field>

						<form.AppField name='email'>
							{(field) => <field.Input type={`email`} placeholder={'E-mail'} />}
						</form.AppField>

						<form.AppField name='website'>
							{(field) => <field.Input placeholder={'Link do strony www'} />}
						</form.AppField>

						<form.AppField name='projects_per_year'>
							{(field) => <field.Input placeholder={'Liczba projektów rocznie'} />}
						</form.AppField>
					</div>
				</div>
				<div>
					<h4 className={`text-[18px] font-bold`}>Informacje dodatkowe o Twoim projekcie </h4>
					<div className={`grid gap-4 pt-2 md:grid-cols-2 xl:mr-4`}>
						<form.AppField name='city'>
							{(field) => <field.Input placeholder={'Miejscowość'} />}
						</form.AppField>

						<form.AppField name='project_type'>
							{(field) => (
								<field.Select placeholder={'Typ'}>
									{PROJECT_TYPES.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.value}
										</SelectItem>
									))}
								</field.Select>
							)}
						</form.AppField>

						<form.AppField name='project_area'>
							{(field) => (
								<field.Select placeholder={'Metraż'}>
									{PROJECT_AREAS.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</field.Select>
							)}
						</form.AppField>

						<form.AppField name='completion_date'>
							{(field) => (
								<field.Select placeholder={'Termin realizacji MM / RR'}>
									{PROJECT_AREAS.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</field.Select>
							)}
						</form.AppField>

						<form.AppField name='project_budget'>
							{(field) => (
								<field.Select placeholder={'Budżet'}>
									{PROJECT_BUDGETS.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</field.Select>
							)}
						</form.AppField>

						<form.AppField name='project_stage'>
							{(field) => (
								<field.Select placeholder={'Etap projektu'}>
									{PROJECT_STAGES.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</field.Select>
							)}
						</form.AppField>
					</div>
				</div>

				<div className={`grid gap-2 pt-4`}>
					<form.AppField name='consents.consent1'>
						{(field) => (
							<field.Checkbox
								label={`Zapoznałem/am się z Regulaminem i Polityką Prywatności oraz akceptuje ich postanowienia`}
							/>
						)}
					</form.AppField>
					<form.AppField name='consents.consent2'>
						{(field) => (
							<field.Checkbox
								label={`Wyrażam zgodę na kontakt w sprawie realizacji zamówienia oraz otrzymywania informacji związanych z obsługą zamówienia`}
							/>
						)}
					</form.AppField>
				</div>

				<div className={`flex flex-col gap-4 pt-4 xl:mr-4 xl:items-end`}>
					<div className={`grid gap-2`}>
						<p className={`ml-auto text-[2rem] text-nowrap xl:text-[2.5rem]`}>39 PLN</p>
						<Tip
							disabled={!emptyCart}
							content={'Koszyk jest pusty'}
							side={`bottom`}
							className={cn(`ml-auto`, emptyCart && 'cursor-not-allowed')}
						>
							<Button
								disabled={emptyCart}
								type={'submit'}
								variant={'mood'}
								size={`lg`}
								className={cn(
									`ml-auto w-fit cursor-pointer xl:w-full`,
									(!isFormValid || emptyCart) && 'cursor-not-allowed opacity-50'
								)}
							>
								Przejdź do płatności
							</Button>
						</Tip>
					</div>
				</div>
				{isSubmitting && (
					<div className={`pointer-events-none absolute inset-0 flex items-center justify-center`}>
						<LogoSvg asButon={false} className={`animate-bounce duration-500`} />
					</div>
				)}
			</form>
		</>
	);
}
