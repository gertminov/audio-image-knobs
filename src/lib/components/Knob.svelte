<script lang="ts">
	import type { OnPan } from '../actions/pan';
	import usePan from '../actions/pan';
	import { round, scale } from '../helpers';

	export let min: number;
	export let max: number;
	export let value: number;
	export let label: string;
	export let steps: number = 200;
	export let precision: number = 0;

	$: rotation = scale(value, [min, max], [0, 270], 0);

	const onPan: OnPan = ({ dy }) => {
		if (dy && dy !== 0) {
			const interval = (max - min) / steps;
			const change = round(value - dy * interval, precision);
			value = Math.max(Math.min(change, max), min);
		}
	};
</script>


<div class="grid place-content-center">
	<div
			 class=" flex flex-col justify-center items-center cursor-ns-resize"
			 use:usePan={onPan}
	>
<!--		<ProgressRadial width="w-14" stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" value={rotation} />-->
		<div class="relative  h-14 aspect-square">
			<svg
				style="transform: rotate({-135 + rotation}deg);"
				class="shadow-l"
				width="56"
				height="56"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M56 29.649c-1.653-1.825-2.876-4.088-3.307-6.57-.503-2.555-.36-5.037.431-7.446a25.97 25.97 0
				00-6.613-8.686c-2.372.146-4.888-.292-7.189-1.46-2.3-1.168-4.17-2.92-5.535-4.89-3.666-.73-7.333-.804-10.783-.147a13.958
				13.958 0 01-5.607 4.818c-2.3 1.095-4.817 1.533-7.26 1.241-2.733 2.263-5.105 5.183-6.83 8.467.647 2.336.79
				4.891.287 7.446-.647 2.555-1.869 4.745-3.594 6.497.072 3.722.79 7.372 2.228 10.657 2.229.876 4.242 2.336 5.895
				4.526 1.582 2.044 2.516 4.525 2.876 6.861 2.875 2.19 6.038 3.87 9.704 4.891 2.085-1.168 4.53-1.898 7.117-1.898
				2.588 0 4.96.73 7.117 2.044 3.45-.803 6.83-2.409 9.777-4.672.431-2.409 1.366-4.744 3.019-6.788 1.653-2.044
				3.738-3.431 6.039-4.307.718-1.606 1.365-3.358 1.797-5.183.215-1.606.36-3.576.431-5.401z"
					fill="var(--color-dark-shadow)"
				/>
			</svg>
			<svg
				style="transform: rotate({-135 + rotation}deg);"
				width="56"
				height="56"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M56 29.649c-1.653-1.825-2.876-4.088-3.307-6.57-.503-2.555-.36-5.037.431-7.446a25.97 25.97 0
				00-6.613-8.686c-2.372.146-4.888-.292-7.189-1.46-2.3-1.168-4.17-2.92-5.535-4.89-3.666-.73-7.333-.804-10.783-.147a13.958
				13.958 0 01-5.607 4.818c-2.3 1.095-4.817 1.533-7.26 1.241-2.733 2.263-5.105 5.183-6.83 8.467.647 2.336.79
				4.891.287 7.446-.647 2.555-1.869 4.745-3.594 6.497.072 3.722.79 7.372 2.228 10.657 2.229.876 4.242 2.336 5.895
				4.526 1.582 2.044 2.516 4.525 2.876 6.861 2.875 2.19 6.038 3.87 9.704 4.891 2.085-1.168 4.53-1.898 7.117-1.898
				2.588 0 4.96.73 7.117 2.044 3.45-.803 6.83-2.409 9.777-4.672.431-2.409 1.366-4.744 3.019-6.788 1.653-2.044
				3.738-3.431 6.039-4.307.718-1.606 1.365-3.358 1.797-5.183.215-1.606.36-3.576.431-5.401z"
					fill="var(--color-6)"
				/>
				<circle cx="28" cy="28" r="17" fill="var(--color-light-shadow)" />
				<circle cx="28" cy="28" r="14" fill="var(--color-light)" />
				<circle cx="28" cy="5" fill="#000000" r="2" />
			</svg>
		</div>
		{#if label}
			<div class="pointer-events-none select-none pt-2 text-sm md:text-base">{label}</div>
		{/if}
	</div>
</div>

<style>
	svg {
      --color-6: #f6f6f6;
      --color-dark-shadow: #676767;
			--color-light-shadow: #d9d9d9;
			--color-light: #ffffff;
	}
    svg {
        position: absolute;
        top: 0;
        left: 0;
        transform-origin: center;
    }
    .shadow-l {
        top: 4px;
        left: 2px;
    }
</style>
