export async function getThemeStore() {
	const {themeStore} = await import('./styles/styles.js');
	return themeStore;
}

export async function getAudioManager() {
	const {audioManager} = await import('./audio-manager.js');
	return audioManager;
}
