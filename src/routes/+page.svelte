<script lang="ts">
	import { SynthEngine } from '$lib/SynthEngine';
	import * as Tone from 'tone';
	import {
		centerPeripheryStore,
		cleanDirtyStore,
		darkBrightStore,
		hardSoftStore,
		isPlayingStore,
		lowHighStore,
		slowFastStore,
		volumeStore
	} from '$lib/SynthParamsStore';
	import ISKnobs from '$lib/components/ISKnobs.svelte';
	import Knob from '$lib/components/Knob.svelte';
	import { sequenceStore } from '$lib/Sequencer';
	import Sequencer from '$lib/components/Sequencer.svelte';
	import { hideLabelStore } from '$lib/helpers';

	let synth: SynthEngine;


	async function setup() {
		await Tone.start();
		synth = new SynthEngine();
		const dings = new Map([
			[darkBrightStore, (val: number) => synth.setDarkBright(val)],
			[slowFastStore, (val: number) => synth.setSlowFast(val)],
			[lowHighStore, (val: number) => synth.setLowHigh(val)],
			[centerPeripheryStore, (val: number) => synth.setCenterPeriphery(val)],
			[cleanDirtyStore, (val: number) => synth.setCleanDirty(val)],
			[hardSoftStore, (val: number) => synth.setHardSoft(val)],
			[volumeStore, (val: number) => synth.setVolume(val)]
		]);
		dings.forEach((v, k) => k.subscribe(newVal => v(newVal)));
		isPlayingStore.subscribe(newVal => synth.playPause(newVal));
		// sequenceStore.subscribe(newVal => synth.setSequence(newVal.steps));
	}

	async function startStop() {
		if (!synth) await setup();
		$isPlayingStore = !$isPlayingStore;
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="space-y-8">
		<div class=" flex justify-between">
			<div class="grid place-content-center">
				<button class="btn variant-filled-primary w-16 aspect-square"
								on:click={startStop}
				>
					<svg width="40" height="40" viewBox="0 0 40 40" fill="none" class="play" class:pause={$isPlayingStore} xmlns="http://www.w3.org/2000/svg">
						<path d="M40 20 L0 0 L0 40 L40 20" fill="white" />
					</svg>
				</button>
			</div>
			<div class="grid place-content-center">
				<button class="btn variant-soft-secondary"
								on:click={()=> {$hideLabelStore = !$hideLabelStore}}
				>{$hideLabelStore? "Hide Labels": "Show Labels"}</button>
			</div>
			<Knob bind:value={$volumeStore} min={0} max={1} precision={2} label="Volume"  hidableLabel={false}/>
		</div>
		<ISKnobs />
		<Sequencer sequence={sequenceStore} />
	</div>
</div>

<style>
	.play path {
			transition: 0.15s;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			d: path("M40 20 L0 0 L0 40 L40 20")
	}
	.pause path {
			transition: 0.15s;
			d: path("M40 0 L0 0 L0 40 L40 40")
	}
</style>
