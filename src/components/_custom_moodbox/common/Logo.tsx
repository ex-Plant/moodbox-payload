import { cn } from "@/utilities/ui";

type PropsT = {
	className?: string;
	asButon: boolean;
};

export default function LogoSvg({ className, asButon }: PropsT) {
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	return (
		<button
			onClick={scrollToTop}
			className={cn(`block`, asButon ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none', className)}
		>
			<svg
				className={cn(`h-10 w-auto`)}
				version='1.1'
				viewBox='800 400 400 400'
				// width='2000'
				// height='1414'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					transform='translate(948,614)'
					d='m0 0h224l9 3 4 5 2 7v142l-2 7-5 5-3 2-5 1h-223l-9-3-5-6-1-2v-150l4-6 5-4z'
					fill='#472927'
				/>
				<path
					transform='translate(825,414)'
					d='m0 0h153l5 3 5 6 1 6v144l-2 8-7 6-8 2h-141l-8-2-5-3-3-5-1-4v-148l3-7 5-5z'
					fill='#472927'
				/>
				<path
					transform='translate(828,614)'
					d='m0 0h65l8 3 4 5 2 6v145l-3 7-5 5-3 1h-72l-7-5-3-6v-149l3-6 5-4z'
					fill='#472927'
				/>
				<path
					transform='translate(1027,513)'
					d='m0 0h148l8 5 3 7v51l-4 8-6 4h-149l-6-3-4-6-1-3v-51l4-8z'
					fill='#472927'
				/>
				<path
					transform='translate(1026,414)'
					d='m0 0h150l6 4 4 6v54l-4 6-6 4h-150l-6-4-3-4-1-3v-53l4-6z'
					fill='#472927'
				/>
			</svg>
		</button>
	);
}
