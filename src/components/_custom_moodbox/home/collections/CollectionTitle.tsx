import { Tip } from '../../ui/Tip';

type PropsT = {
	title: string;
	selectedWithinCatLen: number;
};

export default function CollectionTitle({ title, selectedWithinCatLen }: PropsT) {
	return (
		<header className={`text-mood-dark-gray text-md flex items-center pb-6 lg:text-[24px] xl:pl-4`}>
			<h3 className={`font-bold`}>{title}</h3>
			<Tip delay={400} side={`right`} content={`Możesz wybrać po dwie próbki z każdej kategorii`}>
				{selectedWithinCatLen > 1 && <span className={`mx-2`}>{selectedWithinCatLen} / 2</span>}
			</Tip>
		</header>
	);
}
