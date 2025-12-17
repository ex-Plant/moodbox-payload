export const GET_CUSTOMERS_WITH_ORDERS_QUERY = `
  query GetCustomersWithOrders($first: Int!, $after: String) {
    customers(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          email
          firstName
          lastName
          phone
          state
          tags
          createdAt
          defaultAddress {
            address1
            city
            province
            country
            zip
          }
          orders(first: 1) {
            edges {
              node {
                id
                name
                createdAt
                displayFinancialStatus
                displayFulfillmentStatus
                customAttributes {
                  key
                  value
                }
                currentTotalPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
                lineItems(first: 5) {
                  edges {
                    node {
                      name
                      quantity
                      sku
                      discountedTotalSet {
                        shopMoney {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
                metafields(first: 20) {
                  edges {
                    node {
                      id
                      namespace
                      key
                      value
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const GET_ORDER_BY_ID_QUERY = `
  query GetOrderById($id: ID!) {
    order(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
      customer {
        id
        email
        firstName
        lastName
      }
      lineItems(first: 50) {
        edges {
          node {
            name
            product {
              title
              handle
              metafield(namespace: "custom", key: "brand") {
                key
                value
              }
            }
            variant {
              title
            }
          }
        }
      }
      fulfillments {
        createdAt
      }
    }
  }
`
