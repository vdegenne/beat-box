import {state, ReactiveController} from '@snar/lit';
import {Track} from './beatbox-track/Track.js';
import {confirm} from './confirm.js';

export class AudioManager extends ReactiveController {
	@state() tracks: Track[] = [];

	addTrack(element: HTMLAudioElement) {
		const track = new Track();
		track.uid = Date.now();
		track.element = element;
		track.element.play();

		this.tracks = [...this.tracks, track];
	}

	@confirm({
		content: 'Are you sure to delete this track?',
	})
	removeTrack(track: Track) {
		this.tracks.splice(this.tracks.indexOf(track) >>> 0, 1);
		this.requestUpdate();
	}

	stopAll() {
		this.tracks.forEach((track) => {
			track.element.pause();
			track.element.currentTime = 0;
		});
	}

	playYall() {
		this.tracks.forEach((track) => {
			track.element.play();
		});
	}
}

export const audioManager = new AudioManager();
