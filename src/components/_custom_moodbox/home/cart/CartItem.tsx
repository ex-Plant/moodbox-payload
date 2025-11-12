import { Tip } from '../../ui/Tip';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { ProductVariantT } from '@/lib/shopify/types'
import useCart from '@/lib/hooks/useCart'

type PropsT = {
	selected: ProductVariantT;
};

export default function CartItem({ selected }: PropsT) {
	const { deleteCartItem } = useCart();

	const src = selected.image?.url;

	return (
		<li className={`flex gap-2`}>
			<div className={`relative size-[60px] rounded outline`}>
				{src && <Image width={60} height={60} className={`h-full w-full rounded`} src={src} alt={''} />}
			</div>

			<div className={``}>
				<p className={`line-clamp-1 pt-1 text-[10px] leading-tight font-bold text-[#9d9c9c]`}>
					{selected.product?.productType}
				</p>
				<p className={`line-clamp-1 text-[14px] leading-tight font-bold`}>{selected.product?.description}</p>
				<h6 className={`text-mood-dark-gray line-clamp-1 text-[12px] leading-tight`}>{selected.title}</h6>
			</div>

			<Tip content={`Usuń z koszyka`} className={`item-start ml-auto flex pt-1`}>
				<X onClick={() => deleteCartItem(selected.id)} className={`size-4`} />
			</Tip>
		</li>
	);
}
