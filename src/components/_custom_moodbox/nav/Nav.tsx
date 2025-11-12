'use client';

import LogoSvg from '../common/Logo';
import LogoText from '../common/LogoText';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavItem from './NavItem';
import { cn } from '@/utilities/ui'

export default function Nav() {
	const [isOnTop, setIsOnTop] = useState(true);

	const animDuration = 'duration-200';

	useEffect(() => {
		if (typeof window === 'undefined') return;

		function handleScroll() {
			setIsOnTop(window.scrollY < 80);
		}

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className={`xPaddings pointer-events-none fixed top-0 right-0 left-0 z-10 mx-auto max-w-[1440px]`}>
			<div
				className={cn(
					`relative flex grid-cols-12 items-center justify-between border-b xl:grid`,
					isOnTop ? 'border-background h-16 xl:h-20' : 'h-14 border-transparent',
					animDuration
				)}
			>
				<Link className={`pointer-events-auto col-span-3`} href={'/'}>
					<div
						className={cn(
							`absolute top-0 bottom-0 left-0 flex items-center`,
							isOnTop ? `translate-x-0 opacity-100` : `translate-x-[-50vw] opacity-0`,
							animDuration
						)}
					>
						<LogoText />
					</div>
					<div
						className={cn(
							`bg-background pointer-events-none fixed top-0 right-0 left-0 flex h-14 items-center justify-center`,
							isOnTop ? `opacity-0` : `opacity-100`,
							animDuration
						)}
					>
						<LogoSvg
							className={cn(
								`h-10`,
								isOnTop ? `translate-y-[-200px] rotate-360` : `translate-y-0 rotate-0`,
								animDuration
							)}
							asButon={true}
						/>
					</div>
				</Link>
				<NavItem
					className={`col-start-11 mr-4 ml-auto xl:mr-0 xl:ml-0`}
					title='FAQ'
					href={{ pathname: '/faq', hash: '' }}
					isOnTop={isOnTop}
					animationDuration={animDuration}
				/>
				<NavItem
					title='Kontakt'
					href={{ pathname: '/contact', hash: '' }}
					isOnTop={isOnTop}
					animationDuration={animDuration}
				/>
			</div>
		</nav>
	);
}
