import React from 'react';

export default function Skeleton({ className = '' }) {
	return (
		<div className={`relative overflow-hidden rounded-xl bg-white/5 border border-white/10 ${className}`}>
			<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			<style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
		</div>
	);
}
