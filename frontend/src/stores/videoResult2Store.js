import { create } from "zustand";

const	videoResult2Store = (set) => ({
	isPlaying: false,
	isPaused: false,
	progress: 0,
	replay: false,
	intervalRef: null,
	setIsPlaying: (value) => set({isPlaying: value}),
	setIsPaused: (value) => set({isPaused: value}),
	setProgress: (value) => set({progress: value}),
	setReplay: (value) => set({replay: value}),
	setIntervalRef: (value) => set({intervalRef: value}),
});

const	useVideoResult2Store = create(videoResult2Store);

export default useVideoResult2Store;
