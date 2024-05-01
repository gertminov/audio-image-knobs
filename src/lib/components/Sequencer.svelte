<script lang="ts">
	import { OCTAVE, type Sequence, type SequenceStore } from '$lib/Sequencer';

		export let sequence: SequenceStore
		const notes = ["C", "D", "E", "F", "G", "A", "B"]
		function isCurrentNote(seq: Sequence, note: string, idx: number) {
			const curSt = seq.currentStep
			if(note == seq.steps[curSt][0] && curSt == idx) {
				return "bg-secondary-500"
			}else if(note == seq.steps[idx][0] && curSt != idx) {
				return "bg-tertiary-500"
			} else if (curSt == idx) {
				return "bg-secondary-300"
			} else {
				return  "bg-surface-400-500-token"
			}
		}
</script>

<section class="flex justify-center items-center ">
<div class="flex gap-2 w-full">
	{#each $sequence.steps as step, idx (idx)}
		<div class="flex flex-col gap-2 items-center ">
			{#each notes as note }
				<button
					class="h-8 md:h-12 aspect-square {isCurrentNote($sequence, note, idx)}"
					on:click={()=>{sequence.changeNote(note + OCTAVE, idx)}}
				></button>
			{/each}
		</div>
	{/each}
</div>

</section>