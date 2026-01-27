import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export enum ToastPosition {
  BottomCenter = 'bottom-center',
  TopCenter = 'top-center',
}

export function toastMessage(
  message: string,
  type: ToastType = ToastType.Success,
  position: ToastPosition = ToastPosition.BottomCenter,
  autoClose: number = 5000,
) {
  toast[type](message, {
    position: position,
    hideProgressBar: true,
    autoClose: autoClose,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  })
}
