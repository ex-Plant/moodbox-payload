import { UrlObject } from 'node:url';
import Link from 'next/link';
import { cn } from '@/utilities/ui'

type PropsT = {
	title: string;
	href: UrlObject;
	className?: string;
	isOnTop: boolean;
	animationDuration: string;
};

export default function NavItem({ title, href, className, isOnTop, animationDuration }: PropsT) {
	return (
		<>
			<Link
				className={cn(
					`pointer-events-auto col-span-1 text-right text-white`,
					isOnTop ? 'opacity-100' : 'opacity-0',
					animationDuration,
					className
				)}
				href={href}
			>
				<span className={cn(`border-b border-transparent delay-200 hover:border-white pb-0.5`, animationDuration)}>
					{title}
				</span>
			</Link>
		</>
	);
}
