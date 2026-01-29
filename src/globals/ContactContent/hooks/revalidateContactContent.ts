import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateContactContent: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating contact-content`)

    revalidatePath('/contact')
  }

  return doc
}
