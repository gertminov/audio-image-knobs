import * as Tone from 'tone';
import type { EnvelopeOptions } from '$lib/SynthParamsStore';
import type { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import { cubicEaseIn } from '$lib/synth/easing';
import { DarkBright } from '$lib/synth/DarkBright';
import { CenterPeriphery } from '$lib/synth/CenterPeriphery';
import { sequenceStore } from '$lib/Sequencer';


export class SynthEngine {
	private synth: Tone.PolySynth<Tone.FMSynth>;
	private filterEnvelope: Tone.FrequencyEnvelope;
	private distrotion: Tone.Distortion;
	private readonly volume: Tone.Volume

	// private loop: Tone.Loop;
	private readonly sequence: Tone.Sequence
	private transpose = 0;
	private isPlaying = false;
	private readonly darkBright: DarkBright
	private readonly centerPeriphery: CenterPeriphery
	private readonly defaultModulationEnv = {attack: 0.5, decay: 0, sustain: 1, release: 0.5}

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
		// volume: 3,
		harmonicity: 1,
		modulationIndex: 0.3,
		// modulationEnvelope: this.ampEnv,
		modulation: { type: 'square' }
	};


	constructor() {
		this.distrotion = new Tone.Distortion(0);


		this.darkBright = new DarkBright()
		this.centerPeriphery = new CenterPeriphery()


		const filter = new Tone.Filter({ frequency: 100 });
		this.filterEnvelope = new Tone.FrequencyEnvelope({
			...this.synthSettings.filterEnvelope,
			baseFrequency: 'C0',
			octaves: 8
		});
		this.filterEnvelope.connect(filter.frequency);


		this.volume = new Tone.Volume(0)
		// const volumeScale = new Tone.Scale(-30, -60, 3);
		// this.volume = new Tone.Signal(0.5);
		// this.volume.connect(volume)

		this.synth = new Tone.PolySynth(Tone.FMSynth, this.synthSettings).chain(
			filter,
			this.distrotion,
			...this.centerPeriphery.output,
			...this.darkBright.output,
			this.volume,
			Tone.Destination
		);



		// this.loop = new Tone.Loop((time) => {
		// 	this.filterEnvelope.triggerAttack(time);
		// 	this.synth.triggerAttackRelease(this.getNote(),
		// 		'16n.',
		// 		time);
		// }, '8n');
		this.sequence = new Tone.Sequence((time, note) =>{
			Tone.Draw.schedule(()=>{
				sequenceStore.step()
			}, time)
			this.filterEnvelope.triggerAttack(time + 0.03);
			this.synth.triggerAttackRelease(Tone.Midi(note).transpose(this.transpose).toNote(),
				'16n.',
				time + 0.03);
		}, ["C3", "G3", "C3", "D3", "E3", "C3", "D3", "E3"]  )
	}

	private getNote() {
		// const note = nextNote()
		// return Tone.Midi(note).transpose(this.transpose).toFrequency();
	}

	setSequence(sequence: string[]) {
		this.sequence.events = sequence
	}



	setSlowFast(tempo: number) {
		Tone.Transport.bpm.value = Math.round(40 + tempo * 160)
	}

	setLowHigh(pitch: number) {
		this.transpose = pitch;
	}

	setCenterPeriphery(center: number) {
		this.centerPeriphery.setCenterPeriphery(center)
	}

	setCleanDirty(dirtieness: number) {
		const easedDirtyness = cubicEaseIn(dirtieness, 5);
		const modulationEnvelope= dirtieness < 0.5? this.defaultModulationEnv : {
			attack: this.ampEnv.attack * dirtieness,
				decay: this.ampEnv.decay * dirtieness,
				sustain: 0,
				release: this.ampEnv.release * dirtieness
		}
		this.synth.set({
			modulationIndex: easedDirtyness * 20 ,
			modulationEnvelope
		});
		this.distrotion.set({ distortion: easedDirtyness });
	}

	setHardSoft(hardness: number) {
		const easedHardness = cubicEaseIn(hardness);
		const attack = 0.0001 + cubicEaseIn(hardness, 13) * 0.8;
		const decay = 0.023 + (easedHardness * 10);
		const sustain = 0;
		const release = Math.min( easedHardness * 6, 1.5)

		this.setAmpEnv({ attack, decay, sustain, release });
		this.setFilterEnv({ attack: 0.003, decay, sustain: 1, release });
	}



	setDarkBright(brightness: number) {
		this.darkBright.setDarkBright(brightness)
	}

	setVolume(volume: number) {
		// this.volume.set({volume: (volume*100)-70})
		this.volume.volume.rampTo((volume*50)-20, 0.1)
		// this.volume.value = Math.round(volume * 5)

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
		// this.loop.start(0);
		this.sequence.start(0)
		Tone.Transport.start();
	}

	private pause() {
		Tone.Transport.stop();
	}

}
