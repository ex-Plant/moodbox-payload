import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartStoreT = {
	cartItems: string[];
	addCartItem: (id: string) => void;
	deleteCartItem: (id: string) => void;
	removeAllItems: () => void;
};

export const useCartStore = create<CartStoreT>()(
	persist(
		(set) => ({
			cartItems: [],
			addCartItem: (id: string) => set((state) => ({ cartItems: [...state.cartItems, id] })),
			deleteCartItem: (id: string) =>
				set((state) => ({
					cartItems: state.cartItems.filter((el) => el !== id),
				})),
			removeAllItems: () => set({ cartItems: [] }),
		}),
		{
			name: 'cart-storage', // localStorage key
		}
	)
);

export default function useCart() {
	const cartItems = useCartStore((s) => s.cartItems);
	const addCartItem = useCartStore((s) => s.addCartItem);
	const deleteCartItem = useCartStore((s) => s.deleteCartItem);
	const removeAllItems = useCartStore((s) => s.removeAllItems);
	return { addCartItem, deleteCartItem, removeAllItems, cartItems };
}
