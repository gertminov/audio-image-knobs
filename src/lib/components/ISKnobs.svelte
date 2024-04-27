<script lang="ts">
	import { lowHighStore, slowFastStore, centerPeripheryStore, cleanDirtyStore, hardSoftStore, darkBrightStore } from '$lib/SynthParamsStore';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	const settings = {min: 0, max: 1, step: 0.1}
</script>

<div>
	<RangeSlider name="low-high-slider" min="{0}" max="{11}" step="{1}" bind:value={$lowHighStore}>
		<div class="flex justify-between items-center">
			<div>High/Low</div>
			<div>{$lowHighStore}</div>
		</div>
	</RangeSlider>
	<RangeSlider name="slow-fast-slider" min={40} max={200} step={1} bind:value={$slowFastStore}>
		<div class="flex justify-between items-center">
			<div>Slow/Fast</div>
			<div>{$slowFastStore}</div>
		</div>
	</RangeSlider>
	<RangeSlider name="center-periphery-slider" {...settings} bind:value={$centerPeripheryStore}>
		<div class="flex justify-between items-center">
			<div>Center/Periphery</div>
			<div>{$centerPeripheryStore}</div>
		</div>
	</RangeSlider>
	<RangeSlider name="clean-dirty-slider" {...settings} bind:value={$cleanDirtyStore}>
		<div class="flex justify-between items-center">
			<div>Clean/Dirty</div>
			<div>{$cleanDirtyStore}</div>
		</div>
	</RangeSlider>
	<RangeSlider name="hard-soft-slider" {...settings} bind:value={$hardSoftStore}>
		<div class="flex justify-between items-center">
			<div>Hard/Soft</div>
			<div>{$hardSoftStore}</div>
		</div>
	</RangeSlider>
	<RangeSlider name="smooth-rough-slider" {...settings} bind:value={$darkBrightStore}>
		<div class="flex justify-between items-center">
			<div>Dark/Bright</div>
			<div>{$darkBrightStore}</div>
		</div>
	</RangeSlider>

</div>