import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {withStyles} from 'lit-with-styles';
import styles from './app-shell.css?inline';
import {materialShellLoadingOff} from 'material-shell';
import '../track-recorder/track-recorder.js';
import {getAudioManager} from '../imports.js';
import {type AudioManager} from '../audio-manager.js';

let audioManager: AudioManager;
getAudioManager().then((manager) => (audioManager = manager));

@customElement('app-shell')
@withStyles(styles)
export class AppShell extends LitElement {
	firstUpdated() {
		materialShellLoadingOff.call(this);
		audioManager.bind(this);
	}

	render() {
		return html`
			<header class="p-2">
				<md-icon-button @click=${() => audioManager.playYall()}>
					<md-icon>play_arrow</md-icon>
				</md-icon-button>
				<md-icon-button @click=${() => audioManager.stopAll()}>
					<md-icon fill>stop</md-icon>
				</md-icon-button>
			</header>

			<div id="main-container">
				<md-list>
					${repeat(
						audioManager.tracks,
						(track) => track.uid,
						(track) => html`
							<md-list-item>
								${track.element}
								<md-icon-button
									slot="end"
									@click=${() => audioManager.removeTrack(track)}
								>
									<md-icon>delete</md-icon>
								</md-icon-button>
							</md-list-item>
						`,
					)}
				</md-list>
			</div>
			<track-recorder></track-recorder>
		`;
	}
}

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

export const app = window.app; // = new AppShell());
