export const PRODUCT_FRAGMENT = `
	fragment ProductFragment on Product {
		id
		title
		description
		availableForSale
		images(first: 10) {
			edges {
				node {
					id
					url
					altText
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
					image {
						id
						url
						altText
					}
					product {
					title
					productType
					brand: metafield(namespace: "custom", key: "brand") {
						value
					}
					}
				}
			}
		}
		brand: metafield(namespace: "custom", key: "brand") {
			value
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
