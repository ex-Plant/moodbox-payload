'use server';

import { cache } from 'react';
import { shopifyFetch } from './client';
import {
	CREATE_CART_MUTATION,
	GET_ALL_COLLECTIONS_QUERY,
	GET_ALL_PRODUCTS_QUERY,
	GET_COLLECTION_BY_HANDLE_QUERY,
	GET_PRODUCT_BY_HANDLE_QUERY,
} from './queries';
import { CartT, CollectionT, ProductT } from './types';

export async function getAllProducts(): Promise<ProductT[]> {
	const response = await shopifyFetch<{
		products: {
			edges: { node: ProductT }[];
		};
	}>({
		query: GET_ALL_PRODUCTS_QUERY,
		cache: 'no-store',
		tags: ['products'],
	});

	if (!response) return [];
	return response.data.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(handle: string): Promise<ProductT | null> {
	const response = await shopifyFetch<{ product: ProductT | null }>({
		query: GET_PRODUCT_BY_HANDLE_QUERY,
		variables: { handle },
		cache: 'force-cache',
		tags: [`product-${handle}`],
	});

	if (!response) return null;
	return response.data.product;
}

export async function getAllCollections(): Promise<CollectionT[]> {
	const response = await shopifyFetch<{
		collections: {
			edges: { node: CollectionT }[];
		};
	}>({
		query: GET_ALL_COLLECTIONS_QUERY,
		cache: 'no-cache',
		tags: ['collections'],
	});

	if (!response) return [];
	return response.data.collections.edges.map((edge) => edge.node);
}



export const getCachedProductsByCollection = cache(async (): Promise<{ collection: string; handle: string; products: ProductT[] }[]> => {
	const collections = await getAllCollections();

	return collections.map((collection) => ({
		collection: collection.title,
		handle: collection.handle,
		products: collection.products.edges.map((edge) => edge.node),
	}));
})






export async function getProductsByCollection(): Promise<
	{ collection: string; handle: string; products: ProductT[] }[]
> {
	const collections = await getAllCollections();

	return collections.map((collection) => ({
		collection: collection.title,
		handle: collection.handle,
		products: collection.products.edges.map((edge) => edge.node),
	}));
}

export async function getCollectionByHandle(handle: string): Promise<CollectionT | null> {
	const response = await shopifyFetch<{ collection: CollectionT | null }>({
		query: GET_COLLECTION_BY_HANDLE_QUERY,
		variables: { handle },
		cache: 'force-cache',
		tags: [`collection-${handle}`],
	});
	if (!response) return null;

	return response.data.collection;
}

export async function createCart(
	lineItems: { merchandiseId: string; quantity: number }[],
	attributes?: { key: string; value: string }[],
	email?: string
): Promise<CartT | null> {
	const response = await shopifyFetch<{
		cartCreate: {
			cart: CartT | null;
			userErrors?: Array<{ field: string[]; message: string }>;
		};
	}>({
		query: CREATE_CART_MUTATION,
		variables: {
			lineItems,
			attributes: attributes || [],
			email: email || null,
		},
		cache: 'no-store',
	});

	if (!response) return null;

	const { cart, userErrors } = response.data.cartCreate;
	if (!cart && userErrors?.length) {
		console.error('❌ cartCreate userErrors:', userErrors);
	}

	return cart;
}
