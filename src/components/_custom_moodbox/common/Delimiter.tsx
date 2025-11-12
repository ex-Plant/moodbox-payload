import { cn } from "@/utilities/ui";

type PropsT = {
	className?: string;
	title?: string;
};

export default function Delimiter({ title, className }: PropsT) {
	return (
		<div className={`xPaddings mx-auto my-4 max-w-[1440px] xl:my-6`}>
			<div
				className={cn(
					`border-mood-brown relative flex min-h-16 items-center border border-r-0 border-l-0 py-4 xl:min-h-20`,
					className
				)}
			>
				<h2 className={`text-mood-dark-gray text-[1.5rem] xl:pl-4 xl:text-[2.25rem]`}>{title}</h2>
			</div>
		</div>
	);
}
