'use server'
import { ATTRIBUTE_KEY_PL, cartSchema, CartSchemaT } from '@/lib/CartSchema'
import { createCart } from '@/lib/shopify/api'
import { redirect } from 'next/navigation'
import { ProductVariantT } from '@/lib/shopify/types'

export async function checkoutA(
  cartItems: string[],
  formData: CartSchemaT,
  moodboxPrice: ProductVariantT | undefined,
) {
  // console.log(formData, 'formData')

  if (!moodboxPrice) {
    console.log(`❌ Brakująca cena boxa `)
    return { error: true, message: 'Coś poszło nie tak - brakująca cena' }
  }

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

  // Create line items from variant IDs
  const lineItems = cartItems.map((id) => ({
    merchandiseId: id,
    quantity: 1,
  }))

  // Add the flat fee product variant
  lineItems.push({
    merchandiseId: moodboxPrice.id,
    quantity: 1,
  })

  // add custom attributes
  // console.log('📦 lineItems before createCart:', lineItems);
  // console.log('🏷️ attributes:', attributes);
  const cart = await createCart(lineItems, attributes)

  if (cart?.checkoutUrl) {
    redirect(cart.checkoutUrl)
  } else {
    console.log(`❌ Uncaught error in checkout`)
    return { error: true, message: 'Coś poszło nie tak' }
  }
}
