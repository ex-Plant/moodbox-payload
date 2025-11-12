export const txt = `Dlaczego prosimy o wypełnienie formularza?
Informacje o projekcie pozwalają nam przekazać producentom wartościowe dane i usprawnić proces dystrybucji próbek. Dzięki temu materiały są dobierane bardziej precyzyjnie, a cały proces zamawiania staje się szybszy i wygodniejszy.
Twoje dane są chronione i wykorzystywane wyłącznie w celu obsługi zamówienia oraz poprawy jakości usługi.`;

// Types for your select options
type SelectOption = {
	value: string;
	label: string;
};

// Project type options
export const PROJECT_TYPES: SelectOption[] = [
	{ value: 'Mieszkanie', label: 'Mieszkanie' },
	{ value: 'Dom', label: 'Dom' },
	{ value: 'Hotel', label: 'Hotel' },
	{ value: 'Restauracja', label: 'Restauracja' },
	{ value: 'Biuro', label: 'Biuro' },
];

// Project area options
export const PROJECT_AREAS: SelectOption[] = [
	{ value: '0-100', label: '0-100 m²' },
	{ value: '100-500', label: '100-500 m²' },
	{ value: '500-2000', label: '500-2000 m²' },
	{ value: '>2000', label: '2000 m² i więcej' },
];

// Project budget options
export const PROJECT_BUDGETS: SelectOption[] = [
	{ value: '<100', label: 'do 100 tys. zł' },
	{ value: '100-300', label: '100–300 tys. zł' },
	{ value: '300-700', label: '300–700 tys. zł' },
	{ value: '700-1500', label: '700 tys.–1,5 mln zł' },
	{ value: '1500', label: 'powyżej 1,5 mln zł' },
	{ value: 'nie wiem', label: 'jeszcze nie wiem' },
];

// Project stage options
export const PROJECT_STAGES: SelectOption[] = [
	{ value: 'concept', label: 'koncepcja' },
	{ value: 'project', label: 'projekt wykonawczy' },
	{ value: 'realization', label: 'realizacja' },
];
