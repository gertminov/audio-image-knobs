import * as Tone from 'tone';
import { cubicEaseIn } from '$lib/synth/easing';

export class CenterPeriphery {
	private readonly eq: Tone.EQ3
	private readonly widener: Tone.StereoWidener
	private readonly reverb: Tone.Reverb
	private readonly delay: Tone.PingPongDelay
	private readonly panner: Tone.AutoPanner
	private readonly pitchShifter: Tone.PitchShift

	readonly output: Tone.InputNode[]
	constructor() {
		this.eq = new Tone.EQ3({ high: 0, mid: 0, low: 0, highFrequency: 2000 })
		this.widener = new Tone.StereoWidener(0.5);
		this.reverb = new Tone.Reverb({ decay: 4, wet: 0 })
		this.delay = new Tone.PingPongDelay({ delayTime: '16t', feedback: 0, wet: 0 });

		this.panner = new Tone.AutoPanner('4n.').start();
		this.pitchShifter = new Tone.PitchShift({ wet: 0, pitch: 0.3 });


		this.output = [
			this.pitchShifter,
			this.panner,
			this.delay,
			this.reverb,
			this.widener,
			this.eq]
	}

	setCenterPeriphery(center: number) {
		this.reverb.set({ wet:cubicEaseIn(center, 5) });
		this.delay.set({
			wet: cubicEaseIn(center) * 0.7,
			feedback: center * 0.5,
			maxDelay: cubicEaseIn(center * 5)
		});
		this.panner.set({ wet: center * 0.7 });
		this.widener.set({ width: 0.5 + (center / 2) * 0.7 });
		this.eq.set({ high: center * (-12) });
		this.pitchShifter.set({ wet: center * 0.5 });
	}
}