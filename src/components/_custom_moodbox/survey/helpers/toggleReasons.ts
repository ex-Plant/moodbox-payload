import { toastMessage, ToastType } from '../../../../lib/toasts/toasts'
import { UI_MESSAGES } from '../survey_constants'

export function toggleReasons(checked: boolean, current: string[], field: any, reason: string) {
  if (!checked) return field.handleChange(current.filter((r) => r !== reason) as never)
  if (current.length < 2) return field.handleChange([...current, reason] as never)

  toastMessage(UI_MESSAGES.MAX_REASONS_SELECTED, ToastType.Warning)
}
