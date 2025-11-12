import { useEffect, useState } from 'react';

// matchMedia api - The Window interface's matchMedia() method returns a new MediaQueryList object that can then be used to determine if the document matches the media query  string, as well as to monitor the document to detect when it matches (or stops matching) that media query.

// this is more optimal than checking for window width, as it would trigger on every pixel
// change and here it is only triggered if the condition (match) changes

/*
* screens: {
 sm: '640px',
 md: '768px',
 lg: '1024px',
 xxl: '1440px',`
 '3xl': '1920px',
 },*/

type IsXxlQueryT = '(min-width:1440px)';
type isXlQueryT = '(min-width: 1280px) and (max-width:1439px)';
type isLgQueryT = '(min-width: 1024px) and (max-width:1279px)';
type isMdQueryT = '(min-width: 768px) and (max-width:1023px)';
type isSmQueryT = '(max-width: 767px)';
type isMinLgQueryT = '(min-width: 1024px)';
type isMaxMdQueryT = '(max-width: 1023px)';
type isMaxLgQueryT = '(max-width: 1279px)';

const smQ: isSmQueryT = '(max-width: 767px)';
const mdQ: isMdQueryT = '(min-width: 768px) and (max-width:1023px)';
const lgQ: isLgQueryT = '(min-width: 1024px) and (max-width:1279px)';
const xlQ: isXlQueryT = '(min-width: 1280px) and (max-width:1439px)';
const xxlQ: IsXxlQueryT = '(min-width:1440px)';

const isMaxMdQuery: isMaxMdQueryT = '(max-width: 1023px)';
const isMaxLgQuery: isMaxLgQueryT = '(max-width: 1279px)';

const isMinLgQuery: isMinLgQueryT = '(min-width: 1024px)';

type QueryT =
	| IsXxlQueryT
	| isXlQueryT
	| isLgQueryT
	| isMdQueryT
	| isSmQueryT
	| isMinLgQueryT
	| isMaxMdQueryT
	| isMaxLgQueryT;

export default function useMediaQuery(query: QueryT) {
	const getMatches = (q: string): boolean => {
		if (typeof window === 'undefined') return false;
		return window.matchMedia(q).matches;
	};
	const [matches, setMatches] = useState(getMatches(query));

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const media = window.matchMedia(query);

		// Set initial value
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		// Listener callback to update state on media change
		const listener = () => setMatches(media.matches);
		media.addEventListener('change', listener);

		return () => media.removeEventListener('change', listener);
	}, [matches, query]);

	return matches;
}

export function useIsSm() {
	/* max-width =  767px*/
	return useMediaQuery(smQ);
}

export function useIsMd() {
	/* 768 - 1023*/
	return useMediaQuery(mdQ);
}

export function useIsLg() {
	/* 1023 - 1279*/
	return useMediaQuery(lgQ);
}

export function useIsXl() {
	/* 1280 - 1439*/
	return useMediaQuery(xlQ);
}

export function useIsXxl() {
	/* min-width > 1440px*/
	return useMediaQuery(xxlQ);
}

export function useIsMinLg() {
	/* min-width > 1024px*/
	return useMediaQuery(isMinLgQuery);
}

export function useIsMaxMd() {
	/* max-width =  1023px*/
	return useMediaQuery(isMaxMdQuery);
}

export function useIsMaxLg() {
	/* max-width =  1279px*/
	return useMediaQuery(isMaxLgQuery);
}
