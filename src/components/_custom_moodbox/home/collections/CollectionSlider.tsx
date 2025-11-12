'use client';

import CollectionSliderBtn from './CollectionSliderBtn';
import CollectionSliderDialog from './CollectionSliderDialog';
import CollectionSliderProduct from './CollectionSliderProduct';
import CollectionTitle from './CollectionTitle';
import useCart from '../../../../../../../moodbox.pl/src/lib/hooks/useCart';
import { useIsMaxMd, useIsSm } from '../../../../../../../moodbox.pl/src/lib/hooks/useMediaQuery';
import { ProductT } from '../../../../../../../moodbox.pl/src/lib/shopify/types';
import { cn } from '../../../../../../../moodbox.pl/src/lib/utils';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Keyboard, Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type PropsT = {
	slides: ProductT[];
	title: string;
	isFullScreen: boolean;
	initSlide?: number;
	className?: string;
};

export default function CollectionSlider({ slides, title, isFullScreen, initSlide = 0 }: PropsT) {
	const [swiperIsReady, setSwiperIsReady] = useState(false);
	const [swiper, setSwiper] = useState<SwiperType | null>(null);
	const [fullScreenDialogOpen, setFullScreenDialogOpen] = useState(false);
	const [activeSlide, setActiveSlide] = useState(0);
	const [imgHeight, setImgHeight] = useState(0);

	const { cartItems } = useCart();

	const allVariants = slides.flatMap((el) => el.variants.edges);
	const selectedWithinCatLen = allVariants.filter((variant) => cartItems.includes(variant.node.id)).length ?? 0;

	const isMaxMd = useIsMaxMd();
	const isSm = useIsSm();
	let numberOfVisibleSlides = 6;
	let spaces = 48;
	if (isSm) {
		numberOfVisibleSlides = 1;
		spaces = 0;
	} else if (isMaxMd) {
		numberOfVisibleSlides = 4;
		spaces = 24;
	}

	const actualSlidesPerView = isFullScreen ? 1 : numberOfVisibleSlides;
	const navigationActive = isFullScreen ? slides.length > 1 : slides.length > numberOfVisibleSlides;

	const swiperConfig = {
		modules: [Pagination, Mousewheel, Keyboard],
		spaceBetween: isFullScreen ? 0 : spaces,
		slidesPerView: actualSlidesPerView,
		draggable: true,
		centeredSlides: false,
		initialSlide: initSlide,

		loop: slides.length > actualSlidesPerView,
		speed: 250,
		mousewheel: { forceToAxis: true, releaseOnEdges: true, sensitivity: 3.5 },
		keyboard: { enabled: true, onlyInViewport: true },

		onSwiper: (swiperInstance: SwiperType) => {
			setSwiper(swiperInstance);
			setSwiperIsReady(true);
		},
	};

	function toggle(index: number) {
		// do not open dialog on mobile
		if (isSm) return;
		if (isFullScreen) return;
		setFullScreenDialogOpen((curr) => !curr);
		// swiper?.slideTo(index);
		setActiveSlide(index);
	}

	if (slides.length === 0) return <></>;

	return (
		<>
			<div
				className={cn(
					`mx-auto h-full w-full max-w-[1440px]`,
					swiperIsReady ? 'opacity-100 duration-500' : 'opacity-0',
					isFullScreen ? 'max-h-[90vh] overflow-y-auto' : 'xPaddings'
				)}
			>
				{!isFullScreen && <CollectionTitle selectedWithinCatLen={selectedWithinCatLen} title={title} />}
				<div className={cn(`flex`, isFullScreen ? `mx-auto w-full items-center` : 'items-start')}>
					<CollectionSliderBtn
						disabled={!swiperIsReady ? false : !navigationActive}
						onClick={() => swiper?.slidePrev()}
						isFullScreen={isFullScreen}
						direction={'left'}
						sliderImgH={imgHeight}
					/>
					<Swiper {...swiperConfig} className={`mx-9 w-full`}>
						{slides.map((slide, i) => (
							<SwiperSlide key={i} className={``}>
								<CollectionSliderProduct
									setImgHeight={setImgHeight}
									slide={slide}
									selectable={selectedWithinCatLen < 2}
									fullScreen={isFullScreen}
									toggleFullScreen={() => toggle(i)}
								/>
							</SwiperSlide>
						))}
					</Swiper>

					<CollectionSliderBtn
						disabled={!swiperIsReady ? false : !navigationActive}
						onClick={() => swiper?.slideNext()}
						isFullScreen={isFullScreen}
						direction={'right'}
						sliderImgH={imgHeight}
					/>
				</div>
			</div>

			<CollectionSliderDialog
				title={title}
				slides={slides}
				fullScreenDialogOpen={fullScreenDialogOpen}
				setFullScreenDialogOpen={setFullScreenDialogOpen}
				initSlide={activeSlide}
			/>
		</>
	);
}
