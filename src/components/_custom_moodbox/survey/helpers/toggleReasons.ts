import { toastMessage, ToastType } from '../../../../lib/toasts/toasts'

export function toggleReasons(
  checked: boolean,
  current: string[],
  field: any,
  reason: string,
  maxReasonsMessage: string,
) {
  if (!checked) return field.handleChange(current.filter((r) => r !== reason) as never)
  if (current.length < 2) return field.handleChange([...current, reason] as never)

  toastMessage(maxReasonsMessage, ToastType.Warning)
}
