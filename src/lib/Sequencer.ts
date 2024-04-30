import { get, type Writable, writable } from 'svelte/store';



export type Sequence = {
	steps: string[],
	currentStep: number
}

// const startingSequene =

export const OCTAVE = "4"

function createSequenceStore(length: number){
	const {subscribe, set, update}=writable({
		steps: Array.from({ length }, () => "C" + OCTAVE),
		currentStep: 0,
	})

	return {
		subscribe,
		changeNote (note: string, position: number)  {update(cur => {cur.steps[position] = note; return cur})},
		set,
		step: () => {update( cur => {
			cur.currentStep = (cur.currentStep +1)% cur.steps.length;
			return cur
		})},
		update
	}
}
export type SequenceStore = Writable<Sequence> & {
	changeNote: (note: string, position: number) => void,
	step: ()=> void
}
export  const sequenceStore: SequenceStore = createSequenceStore(8)

export function nextNote() {
	const sequence = get(sequenceStore)
	const curIndex = sequence.currentStep
	sequenceStore.step()
	return sequence.steps[curIndex]
}

