import React from 'react';
import { cn } from '@/utilities/ui'

type PropsT = {
	fullScreen: boolean;
	className?: string;
	title: string;
};

export default function Tag({ className, title }: PropsT) {
	return (
		<div className={cn(`bg-mood-dark-brown rounded-full p-1 px-2 text-white`, className)}>
			<span className={``}>{title}</span>
		</div>
	);
}
