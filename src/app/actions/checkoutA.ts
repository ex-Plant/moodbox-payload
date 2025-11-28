'use server'
import { ATTRIBUTE_KEY_PL, cartSchema, CartSchemaT } from '@/lib/CartSchema'
import { createCart, getProductByHandle } from '@/lib/shopify/api'
import { redirect } from 'next/navigation'

export async function checkoutA(cartItems: string[], formData: CartSchemaT) {
  // console.log(formData, 'formData')

  try {
    cartSchema.parse(formData)
  } catch {
    console.log('❌ Invalid data - schema is throwing errors')
    return { error: true, message: 'Coś poszło nie tak, spróbuj ponownie' }
  }

  // map field names to polish keys - this is visible at admin panel when order arrives
  // exclude non-attribute fields like "consents" and keep typing strict
  type AttributeKeyT = Exclude<keyof CartSchemaT, 'consents'>
  const attributes = (Object.keys(formData) as (keyof CartSchemaT)[])
    .filter((k): k is AttributeKeyT => k !== 'consents')
    .map((k) => ({
      key: ATTRIBUTE_KEY_PL[k] ?? String(k),
      value: String((formData as Record<string, unknown>)[k] ?? ''),
    }))

  // this is to get the fixed price of the box
  const flatFeeProduct = await getProductByHandle('box-stala-cena')
  if (!flatFeeProduct?.variants?.edges?.[0]?.node?.id) {
    console.log(`❌ adding flat fee product failed`)
    return { error: true, message: 'Coś poszło nie tak' }
  }

  // Create line items from variant IDs
  const lineItems = cartItems.map((id) => ({
    merchandiseId: id,
    quantity: 1,
  }))

  // TODO add again after testing
  // Add the flat fee product variant
  // lineItems.push({
  //   merchandiseId: flatFeeProduct.variants.edges[0].node.id,
  //   quantity: 1,
  // })

  // add custom attributes
  // console.log('📦 lineItems before createCart:', lineItems);
  // console.log('🏷️ attributes:', attributes);
  const cart = await createCart(lineItems, attributes, formData.email)

  if (cart?.checkoutUrl) {
    // await payload.create({
    //   collection: 'contacts', // Your custom collection
    //   data: formData
    // })
    redirect(cart.checkoutUrl)
  } else {
    console.log(`❌ Uncaught error in checkout`)
    return { error: true, message: 'Coś poszło nie tak' }
  }
}
