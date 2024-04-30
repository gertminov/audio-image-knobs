<script lang="ts">
	import { lowHighStore, slowFastStore, centerPeripheryStore, cleanDirtyStore, hardSoftStore, darkBrightStore } from '$lib/SynthParamsStore';
	import Knob from '$lib/components/Knob.svelte';
</script>

<div class="grid grid-cols-3 max-w-xl gap-2 md:gap-8">
	<Knob bind:value={$lowHighStore} min={0} max={11} steps={24}  label="Low/High" />
	<Knob bind:value={$slowFastStore} min={0} max={1}  precision={2} label="Slow/Fast" />
	<Knob bind:value={$centerPeripheryStore} min={0} max={1}  precision={2} label="Center/Per." />
	<Knob bind:value={$cleanDirtyStore} min={0} max={1}  precision={2} label="Clean/Dirty" />
	<Knob bind:value={$hardSoftStore} min={0} max={1}  precision={2} label="Hard/Soft" />
	<Knob bind:value={$darkBrightStore} min={0} max={1}  precision={2} label="Dark/Bright" />
</div>