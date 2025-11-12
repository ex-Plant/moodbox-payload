type PropsT = {
	title: string;
};

export default function DelimiterFullW({ title }: PropsT) {
	return (
		<>
			<div className={`bg-mood-dark-brown flex py-6 text-white`}>
				<p className={`xPaddings mx-auto text-center text-[1rem] md:text-[1.5rem] xl:text-[1.625rem]`}>
					{title}
				</p>
			</div>
		</>
	);
}
