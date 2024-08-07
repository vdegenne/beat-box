import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {withStyles} from 'lit-with-styles';
import styles from './track-recorder.css?inline';
import {getAudioManager} from '../imports.js';

@customElement('track-recorder')
@withStyles(styles)
export class TrackRecorder extends LitElement {
	@property({reflect: true, type: Boolean}) recording = false;

	private mediaRecorder: MediaRecorder | null = null;
	private audioChunks: Blob[] = [];

	render() {
		return html`
			<div id="background"></div>
			<md-elevation for="container"></md-elevation>
			<md-ripple for="container"></md-ripple>
			<div id="container" @click="${this.toggleRecording}">
				<md-icon>${this.recording ? 'stop' : 'mic'}</md-icon>
			</div>
		`;
	}

	async startRecording() {
		if (!this.recording) {
			const stream = await navigator.mediaDevices.getUserMedia({audio: true});
			this.mediaRecorder = new MediaRecorder(stream);
			this.mediaRecorder.start();

			this.mediaRecorder.ondataavailable = (event) => {
				this.audioChunks.push(event.data);
			};

			this.mediaRecorder.onstop = async () => {
				const audioBlob = new Blob(this.audioChunks, {type: 'audio/wav'});
				const audioManager = await getAudioManager();
				const audio = new Audio(URL.createObjectURL(audioBlob));
				audio.controls = true;
				audio.loop = true;
				audio.style.cssText = 'width:100%';
				audioManager.addTrack(audio);
				this.audioChunks = []; // Clear the chunks for the next recording

				this.recording = false;
				this.mediaRecorder = null;
			};

			this.recording = true;
		}
	}

	endRecording() {
		if (this.recording && this.mediaRecorder) {
			this.mediaRecorder.stop();
		}
	}

	toggleRecording() {
		if (this.recording) {
			this.endRecording();
		} else {
			this.startRecording();
		}
	}
}
