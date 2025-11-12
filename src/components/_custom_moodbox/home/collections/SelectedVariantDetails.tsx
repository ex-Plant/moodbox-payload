import { ProductVariantT } from '../../../../../../../moodbox.pl/src/lib/shopify/types';
import { cn } from '../../../../../../../moodbox.pl/src/lib/utils';
import React from 'react';

type PropsT = {
	fullScreen: boolean;
	selected: ProductVariantT;
	title: string;
};

export default function SelectedVariantDetails({ fullScreen, selected, title }: PropsT) {
	return (
		<div>
			<p
				className={cn(
					`line-clamp-1 pt-1 text-[10px] leading-tight font-bold text-[#9d9c9c]`,
					fullScreen ? 'text-[20px]' : ''
				)}
			>
				{selected.product?.productType}
			</p>
			<p className={cn(`line-clamp-1 text-[14px] leading-tight font-bold`, fullScreen ? 'text-[28px]' : '')}>
				{selected.product?.description}
			</p>
			<h4
				className={cn(
					`text-mood-dark-gray line-clamp-1 text-[12px] leading-tight`,
					fullScreen ? 'text-[1.5rem]' : ''
				)}
			>
				{title}
			</h4>
		</div>
	);
}
