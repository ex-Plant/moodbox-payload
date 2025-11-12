import { ReactNode } from 'react';

export default function IconItem({ icon, text }: { icon: ReactNode; text: string }) {
	return (
		<>
			<div className={`flex flex-col items-center`}>
				<div className={`flex-cols flex`}>{icon}</div>
				<p className={`text-mood-dark-gray max-w-[120px] pt-1 text-center font-bold`}>{text}</p>
			</div>
		</>
	);
}
