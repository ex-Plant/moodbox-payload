import SelectedVariantDetails from './SelectedVariantDetails';
import SelectedVariantImg from './SelectedVariantImg';
import Variants from './Variants';
import { ProductT, ProductVariantT } from '../../../../../../../moodbox.pl/src/lib/shopify/types';
import { cn } from '../../../../../../../moodbox.pl/src/lib/utils';
import React, { useState } from 'react';

type PropsT = {
	slide: ProductT;
	selectable: boolean;
	fullScreen: boolean;
	toggleFullScreen: () => void;
	setImgHeight: (height: number) => void;
};

export default function CollectionSliderProduct({
	slide,
	selectable,
	fullScreen,
	toggleFullScreen,
	setImgHeight,
}: PropsT) {
	const [selected, setSelected] = useState<ProductVariantT>(slide.variants.edges[0].node);

	let title = selected.title;
	if (selected.title === 'Default Title') {
		title = slide.title;
	}

	return (
		<article className={cn(`w-full`, fullScreen && `flex max-h-[80vh] items-end gap-x-12 py-8`)}>
			<div
				onClick={toggleFullScreen}
				className={cn(``, !fullScreen ? `aspect-square md:cursor-zoom-in` : `w-full`)}
			>
				<SelectedVariantImg
					variant={selected}
					selectable={selectable}
					fullScreen={fullScreen}
					setImgHeight={setImgHeight}
				/>
			</div>

			<div className={`w-full`}>
				<SelectedVariantDetails fullScreen={fullScreen} selected={selected} title={title} />
				<Variants
					fullScreen={fullScreen}
					selected={selected}
					setSelected={setSelected}
					variants={slide.variants.edges}
				/>
			</div>
		</article>
	);
}
