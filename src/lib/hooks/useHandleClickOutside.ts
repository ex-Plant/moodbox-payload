import { RefObject, useEffect } from 'react';

export default function useHandleClickOutside(
	ref: RefObject<HTMLElement | null>,
	onClickOutside: () => void,

	disabled?: boolean
) {
	useEffect(() => {
		if (disabled) return;

		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClickOutside();
			}
		}
		// const timeout = setTimeout(() => {
		document.addEventListener('mousedown', handleClickOutside);
		// }, 100)

		return () => {
			// clearTimeout(timeout)
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClickOutside, disabled, ref]);
}
