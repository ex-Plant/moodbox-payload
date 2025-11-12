import VariantImg from './VariantImg';
import { ProductVariantT } from '../../../../../../../moodbox.pl/src/lib/shopify/types';
import { cn } from '../../../../../../../moodbox.pl/src/lib/utils';
import React, { Dispatch } from 'react';

type PropsT = {
	fullScreen: boolean;
	setSelected: Dispatch<React.SetStateAction<ProductVariantT>>;
	selected: ProductVariantT;
	variants: Array<{ node: ProductVariantT }>;
};

export default function Variants({ fullScreen, variants, setSelected, selected }: PropsT) {
	function selectVariant(variant: { node: ProductVariantT }) {
		setSelected(variant.node);
	}

	return (
		<div
			className={cn(
				`grid h-fit w-full`,
				fullScreen ? 'flex w-fit flex-wrap gap-2 pt-4' : `grid-cols-6 gap-2 pt-2 md:grid-cols-4`
			)}
		>
			{variants.map((el, i) => (
				<button
					className={cn(`aspect-square w-full cursor-pointer`, fullScreen && 'size-[50px]')}
					key={i}
					onClick={() => selectVariant(el)}
				>
					<VariantImg variant={el.node} fullScreen={fullScreen} selected={selected} />
				</button>
			))}
		</div>
	);
}
