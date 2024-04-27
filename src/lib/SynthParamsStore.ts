import { writable } from 'svelte/store';


export type EnvelopeOptions = { attack: number; decay: number; sustain: number; release: number };

export interface SynthParams {
	envelope: EnvelopeOptions
	isPlaying: boolean,
	tempo: number
	smoothness: number
}

function createMemoStore(initialValue: number) {
	const valueStore = writable(initialValue)
	function reset() {
		valueStore.set(initialValue)
	}
	return {
		...valueStore,
		reset
	}
}

export const darkBrightStore = createMemoStore(0.3)

export const lowHighStore = createMemoStore(0)

export const slowFastStore =createMemoStore(120)

export const centerPeripheryStore =createMemoStore(0)

export const cleanDirtyStore =createMemoStore(0)

export const hardSoftStore =createMemoStore(.4)

export const isPlayingStore = writable(false)

