import * as Tone from 'tone';
import type { EnvelopeOptions } from '$lib/SynthParamsStore';
import type { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import { cubicEaseIn, cubicEaseOut } from '$lib/synth/easing';


export class SynthEngine {
	private synth: Tone.PolySynth<Tone.FMSynth>;
	private reverb: Tone.Reverb;
	private delay: Tone.PingPongDelay;
	private panner: Tone.AutoPanner;
	private widener: Tone.StereoWidener;
	private eq: Tone.EQ3;
	private eqHighGain: Tone.Signal;
	private pitchShifter: Tone.PitchShift;
	private filterEnvelope: Tone.FrequencyEnvelope;
	private distrotion: Tone.Distortion;
	private lowCutFrequency: Tone.Signal;
	private highCutFrequency: Tone.Signal;

	private loop: Tone.Loop;
	private transpose = 0;
	private isPlaying = false;

	ampEnv: EnvelopeOptions = {
		attack: 0.1,
		decay: 0.3,
		sustain: 1,
		release: 0.3
	};

	synthSettings: RecursivePartial<Tone.FMSynthOptions> & { filterEnvelope: EnvelopeOptions } = {
		filterEnvelope: { ...this.ampEnv, attack: 0.001 },
		envelope: { ...this.ampEnv, attackCurve: 'exponential' },
		oscillator: { type: 'triangle' },
		volume: 3,
		harmonicity: 1,
		modulationIndex: 0.3,
		modulationEnvelope: this.ampEnv,
		modulation: { type: 'square' }
	};


	constructor() {
		this.eq = new Tone.EQ3({ high: 0, mid: 0, low: 0, highFrequency: 2000 });
		const highAdder = new Tone.Add()
		highAdder.connect(this.eq.high)
		this.widener = new Tone.StereoWidener(0.5);
		this.reverb = new Tone.Reverb({ decay: 4, wet: 0 });
		this.delay = new Tone.PingPongDelay({ delayTime: '16t', feedback: 0, wet: 0 });

		this.panner = new Tone.AutoPanner('4n.').start();
		this.pitchShifter = new Tone.PitchShift({ wet: 0, pitch: 0.3 });
		this.distrotion = new Tone.Distortion(0);

		const lowCut = new Tone.Filter(20, 'highpass');
		const lowCutScale = new Tone.ScaleExp(20, 800, 3);
		lowCutScale.connect(lowCut.frequency);
		this.lowCutFrequency = new Tone.Signal<'number'>(1);
		this.lowCutFrequency.connect(lowCutScale);
		const brightEQ = new Tone.EQ3({high: 0, mid: 0, low: 0, highFrequency: 4000})
		const brightEQScale = new Tone.ScaleExp(0,20, 3)
		brightEQScale.connect(brightEQ.high)
		this.lowCutFrequency.connect(brightEQScale)


		const highCut = new Tone.Filter(500, 'lowpass').toDestination();
		this.highCutFrequency = new Tone.Signal<'number'>(1);
		const highCutScale = new Tone.ScaleExp(500, 20000, 10);
		highCutScale.connect(highCut.frequency);
		this.highCutFrequency.connect(highCutScale);



		const filter = new Tone.Filter({ frequency: 100 });
		this.filterEnvelope = new Tone.FrequencyEnvelope({
			...this.synthSettings.filterEnvelope,
			baseFrequency: 'C0',
			octaves: 8
		});
		this.filterEnvelope.connect(filter.frequency);
		this.synth = new Tone.PolySynth(Tone.FMSynth, this.synthSettings).chain(
			filter,
			this.distrotion,
			this.pitchShifter,
			this.panner,
			this.delay,
			this.reverb,
			this.widener,
			this.eq,
			lowCut,
			brightEQ,
			highCut
		);
		this.loop = new Tone.Loop((time) => {
			this.filterEnvelope.triggerAttack(time);
			this.synth.triggerAttackRelease(this.getNote(),
				'16n.',
				time);
		}, '8n');
	}

	private getNote() {
		return Tone.Midi('C3').transpose(this.transpose).toFrequency();
	}




	setSlowFast(tempo: number) {
		this.setTempo(tempo);
	}

	setLowHigh(pitch: number) {
		this.transpose = pitch;
	}

	setSenterPeriphery(center: number) {
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

	setCleanDirty(dirtieness: number) {
		const easedDirtyness = cubicEaseIn(dirtieness, 5);
		this.synth.set({ modulationIndex: easedDirtyness * 20 });
		this.distrotion.set({ distortion: easedDirtyness });
	}

	setHardSoft(hardness: number) {
		const easedHardness = cubicEaseIn(hardness);
		const attack = 0.0001 + cubicEaseIn(hardness, 13) * 0.8;
		const decay = 0.023 + (easedHardness * 10);
		const sustain = 0;
		const release = easedHardness * 6;

		this.setAmpEnv({ attack, decay, sustain, release });
		this.setFilterEnv({ attack: 0.003, decay, sustain: 1, release });
	}

	private setTempo(tempo: number) {
		Tone.Transport.bpm.value = tempo;
	}


	setBrightness(brightness: number) {
		this.highCutFrequency.value = cubicEaseOut(Math.min(0.5, brightness) * 2, 3);
		this.lowCutFrequency.value = cubicEaseOut((Math.max(0.5, brightness) - 0.5) * 2, 3)

	}


	private setAmpEnv(options: EnvelopeOptions) {
		this.ampEnv = options;
		this.synth.set({ envelope: options });
	}

	private setFilterEnv(options: EnvelopeOptions) {
		this.filterEnvelope.set(options);
	}

	playPause(isPlaying: boolean) {
		if (isPlaying != this.isPlaying) {
			if (isPlaying) {
				console.log('isplaying', isPlaying);
				this.isPlaying = true;
				this.play();
			} else {
				this.isPlaying = false;
				this.pause();
			}
		}
	}

	private play() {
		this.loop.start(0);
		Tone.Transport.start();
	}

	private pause() {
		Tone.Transport.stop();
	}

}
