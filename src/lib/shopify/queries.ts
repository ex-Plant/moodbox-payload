export const PRODUCT_FRAGMENT = `
	fragment ProductFragment on Product {
		id
		handle
		title
		description
		descriptionHtml
		availableForSale
		tags
		vendor
		productType
		priceRange {
			minVariantPrice {
				amount
				currencyCode
			}
			maxVariantPrice {
				amount
				currencyCode
			}
		}
		images(first: 10) {
			edges {
				node {
					id
					url
					altText
					width
					height
				}
			}
		}
		variants(first: 100) {
			edges {
				node {
					id
					title
					availableForSale
					selectedOptions {
						name
						value
					}
					price {
						amount
						currencyCode
					}
					compareAtPrice {
						amount
						currencyCode
					}
					image {
						id
						url
						altText
						width
						height
					}
					product {
					productType
					description
					}
				}
			}
		}
		secondName: metafield(namespace: "custom", key: "second_name") {
			key
			value
		}
		material: metafield(namespace: "custom", key: "material") {
			key
			value
		}
	}
`

export const GET_ALL_PRODUCTS_QUERY = `
	${PRODUCT_FRAGMENT}
	query GetAllProducts($first: Int = 100, $after: String) {
		products(first: $first, after: $after) {
			edges {
				cursor
				node {
					...ProductFragment
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`

export const GET_PRODUCT_BY_HANDLE_QUERY = `
	${PRODUCT_FRAGMENT}
	query GetProductByHandle($handle: String!) {
		product(handle: $handle) {
			...ProductFragment
		}
	}
`

export const GET_COLLECTION_BY_HANDLE_QUERY = `
	${PRODUCT_FRAGMENT}
	query GetCollectionByHandle($handle: String!, $first: Int = 100) {
		collection(handle: $handle) {
			id
			handle
			title
			description
			image {
				id
				url
				altText
				width
				height
			}
			products(first: $first) {
				edges {
					node {
						...ProductFragment
					}
				}
			}
		}
	}
`

export const GET_ALL_COLLECTIONS_QUERY = `
	${PRODUCT_FRAGMENT}
	query GetAllCollections($first: Int = 100, $productsFirst: Int = 100) {
		collections(first: $first) {
			edges {
				node {
					id
					handle
					title
					description
					image {
						id
						url
						altText
						width
						height
					}
					products(first: $productsFirst) {
						edges {
							node {
								...ProductFragment
							}
						}
					}
				}
			}
		}
	}
`

export const CREATE_CART_MUTATION = `
	mutation CreateCart($lineItems: [CartLineInput!], $attributes: [AttributeInput!], $email: String) {
		cartCreate(input: {
			lines: $lineItems
			attributes: $attributes
			buyerIdentity: { email: $email }
		}) {
			cart {
				id
				checkoutUrl
				totalQuantity
				attributes {
					key
					value
				}
				lines(first: 100) {
					edges {
						node {
							id
							quantity
							merchandise {
								... on ProductVariant {
									id
									title
									selectedOptions {
										name
										value
									}
									product {
										id
										handle
										title
										featuredImage {
											id
											url
											altText
											width
											height
										}
									}
									price {
										amount
										currencyCode
									}
									compareAtPrice {
										amount
										currencyCode
									}
									image {
										id
										url
										altText
										width
										height
									}
								}
							}
							cost {
								totalAmount {
									amount
									currencyCode
								}
							}
						}
					}
				}
				cost {
					subtotalAmount {
						amount
						currencyCode
					}
					totalAmount {
						amount
						currencyCode
					}
					totalTaxAmount {
						amount
						currencyCode
					}
				}
			}
			userErrors {
				field
				message
			}
		}
	}
`
