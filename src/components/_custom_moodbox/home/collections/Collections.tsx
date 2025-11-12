import Delimiter from '../../common/Delimiter';
import CollectionSlider from './CollectionSlider';
import { ProductT } from '../../../../../../../moodbox.pl/src/lib/shopify/types';
import { Suspense } from 'react';

type PropsT = {
	productsByCollection: { collection: string; handle: string; products: ProductT[] }[];
};

export default function Collections({ productsByCollection }: PropsT) {
	return (
		<section id={'collections'} className={`space-y-4 pb-20`}>
			<Delimiter title={'Katalog próbek'} />
			<Suspense fallback={null}>
				{productsByCollection.map((collection) => (
					<CollectionSlider
						key={collection.collection}
						slides={collection.products}
						title={collection.collection}
						isFullScreen={false}
					/>
				))}
			</Suspense>
		</section>
	);
}
