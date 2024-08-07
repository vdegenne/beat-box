import {ReactiveController, state} from '@snar/lit';
import {PropertyValues} from 'lit';

export class Track extends ReactiveController {
	uid: number;

	element: HTMLAudioElement;

	// @state() playing = true;
	@state() muted = false;

	updated(changed: PropertyValues<this>) {
		// 	console.log(JSON.stringify(this));
		// 	if (changed.has('playing')) {
		// 		if (this.playing) {
		// 			this.element.play();
		// 		} else {
		// 			this.element.pause();
		// 		}
		// 	}
	}
}
