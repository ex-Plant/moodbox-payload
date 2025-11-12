import { cn } from '@/utilities/ui'

export default function LogoSquares() {
	// const height = 'h-[max(2vw,60px)]';
	const height = 'h-5';

	return (
		<div className={`grid aspect-square w-fit`}>
			<div className={`grid gap-y-0.5`}>
				<div className={`grid grid-cols-2 gap-0.5`}>
					<Square className={cn(`aspect-square`, height)} />
					<aside className={`grid gap-y-0.5`}>
						<Square />
						<Square />
					</aside>
				</div>

				<div className={`grid grid-cols-[2fr_8fr] gap-0.5`}>
					<Square className={cn(`grow-0`, height)} />
					<Square className={`grow`} />
				</div>
			</div>
		</div>
	);
}

function Square({ className }: { className?: string }) {
	return <div className={cn(`bg-mood-dark-brown rounded`, className)}></div>;
}
