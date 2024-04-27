<script lang="ts">
	import { SynthEngine } from '$lib/SynthEngine';
	import * as Tone from 'tone';
	import {
		isPlayingStore,
		lowHighStore,
		slowFastStore,
		centerPeripheryStore,
		cleanDirtyStore,
		hardSoftStore,
		darkBrightStore
	} from '$lib/SynthParamsStore';
	import ISKnobs from '$lib/components/ISKnobs.svelte';

	let synth: SynthEngine;


	async function setup() {
		await Tone.start();
		synth = new SynthEngine();
		const dings = new Map([
			[darkBrightStore, (val: number)=>synth.setBrightness(val)],
			[slowFastStore, (val: number)=> synth.setSlowFast(val)],
			[lowHighStore, (val: number)=> synth.setLowHigh(val)],
			[centerPeripheryStore, (val:number) => synth.setSenterPeriphery(val)],
			[cleanDirtyStore, (val:number)=> synth.setCleanDirty(val)],
			[hardSoftStore, (val:number)=> synth.setHardSoft(val)],
		])
		dings.forEach((v, k) => k.subscribe(newVal => v(newVal)) )
		isPlayingStore.subscribe(newVal => synth.playPause(newVal))
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div>
		<button class="btn variant-filled-primary" on:click|once={setup}>Start</button>
		<button class="btn variant-filled-primary w-24" disabled={!synth} on:click={()=>{$isPlayingStore = !$isPlayingStore}}>
			{$isPlayingStore ? 'Pause' : 'Play'}
		</button>
		<ISKnobs/>
	</div>
</div>
