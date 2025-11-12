'use client';

import LogoSvg from './Logo';
import { motion } from 'framer-motion';

export default function Loader() {
	return (
		<div className='z-[1000] flex h-full w-full items-center justify-center'>
			<motion.div
				// animate={{ rotate: 720 }}
				animate={{ rotate: 360 * 2 }}
				transition={{
					duration: 2,
					// times: [0, 0.6, 0.8, 1],
					repeat: Infinity,
					repeatType: 'loop',
					ease: 'easeInOut',
				}}
			>
				<LogoSvg asButon={false} />
			</motion.div>
		</div>
	);
}
