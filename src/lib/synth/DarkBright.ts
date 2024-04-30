import * as Tone from 'tone';
import { cubicEaseOut } from '$lib/synth/easing';

export class DarkBright {
	private readonly lowCutFilter: Tone.Filter
	private readonly highCutFilter: Tone.Filter

	private readonly lowCutFrequency: Tone.Signal
	private readonly highCutFrequency: Tone.Signal


	private readonly eq: Tone.EQ3

	readonly output:Tone.InputNode []
	constructor() {

		this.lowCutFilter = new Tone.Filter(20, 'highpass');
		const lowCutScale = new Tone.ScaleExp(20, 800, 3);
		lowCutScale.connect(this.lowCutFilter.frequency);
		this.lowCutFrequency = new Tone.Signal<'number'>(1);
		this.lowCutFrequency.connect(lowCutScale);

		this.highCutFilter= new Tone.Filter(500, 'lowpass')
		this.highCutFrequency = new Tone.Signal<'number'>(1);
		const highCutScale = new Tone.ScaleExp(500, 20000, 10);
		highCutScale.connect(this.highCutFilter.frequency);
		this.highCutFrequency.connect(highCutScale);

		this.eq = new Tone.EQ3({high: 0, mid: 0, low: 0, highFrequency: 4000})
		const brightEQScale = new Tone.ScaleExp(0,20, 3)
		brightEQScale.connect(this.eq.high)
		this.lowCutFrequency.connect(brightEQScale)

		this.output = [this.lowCutFilter, this.highCutFilter, this.eq]
	}


	setDarkBright(brightness: number) {
		this.highCutFrequency.value = cubicEaseOut(Math.min(0.5, brightness) * 2, 3);
		this.lowCutFrequency.value = cubicEaseOut((Math.max(0.5, brightness) - 0.5) * 2, 3)
	}
}