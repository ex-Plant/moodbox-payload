'use client';

import { cn } from '../../../../../../moodbox.pl/src/lib/utils';
import { SIDE_OPTIONS } from '@radix-ui/react-popper';
import React, { useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

type TipProps = React.PropsWithChildren<{
	content: string | React.ReactNode;
	className?: string;
	contentClassName?: string;
	side?: (typeof SIDE_OPTIONS)[number];
	disabled?: boolean;
	defaultContent?: boolean;
	delay?: number;
}>;
export const Tip = ({
	content,
	children,
	className,
	contentClassName,
	disabled,
	side = 'top',
	delay = 400,
}: TipProps) => {
	const [open, setOpen] = React.useState(false);

	function toggle(e: React.TouchEvent | React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		setOpen((curr) => !curr);
	}

	const timeoutId = useRef<NodeJS.Timeout | null>(null);

	function handleMouseEvent(event: 'mouseenter' | 'mouseleave', e: React.MouseEvent) {
		if (disabled) return;
		e.stopPropagation();

		if (timeoutId.current) clearTimeout(timeoutId.current);

		if (event === 'mouseenter') {
			timeoutId.current = setTimeout(() => {
				setOpen(true);
			}, delay);
		}

		if (event === 'mouseleave') {
			setOpen(false);
			if (timeoutId.current) clearTimeout(timeoutId.current);
		}
	}

	return (
		<TooltipProvider delayDuration={delay}>
			<Tooltip open={disabled ? false : open}>
				<TooltipTrigger asChild>
					<span
						tabIndex={0}
						role={`button`}
						// type="button"
						className={cn('cursor-pointer', className)}
						onMouseEnter={(e) => handleMouseEvent(`mouseenter`, e)}
						onMouseLeave={(e) => handleMouseEvent(`mouseleave`, e)}
						onTouchStart={(e) => toggle(e)}
					>
						{children}
					</span>
				</TooltipTrigger>
				<TooltipContent
					side={side}
					className={cn(
						`center text-xsm w-fit max-w-[300px] border bg-white`,
						contentClassName,
						!content ? 'hidden' : ''
					)}
				>
					<span className='inline-block'>{content}</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
