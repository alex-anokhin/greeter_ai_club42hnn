import { useRef, useState } from "react";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { MdPauseCircleFilled } from "react-icons/md";
import useVideoResult2Store from "../stores/videoResult2Store";


export const	VideoResult2 = ({poster, videoUrl}) => {

	const	videoRef = useRef(null);

	const	replay = useVideoResult2Store(state => state.replay);
	const	setReplay = useVideoResult2Store(state => state.setReplay);
	const	progress = useVideoResult2Store(state => state.progress);
	const	setProgress = useVideoResult2Store(state => state.setProgress);
	const	intervalRef = useVideoResult2Store(state => state.intervalRef);
	const	setIntervalRef = useVideoResult2Store(state => state.setIntervalRef);
	const	isPaused = useVideoResult2Store(state => state.isPaused);
	const	setIsPaused = useVideoResult2Store(state => state.setIsPaused);

	const	updateProgress = () => {
		if (videoRef.current) {
			const	value = (videoRef.current.currentTime / videoRef.current.duration) * 100;
			setProgress(value);
		}
	}

	const	startProgressLoop = () => {
		if (intervalRef) {
			clearInterval(intervalRef);
		}
		setIntervalRef( setInterval(() => {
			updateProgress();
		}, 500));
	}

	const	stopProgressLoop = () => {
		if (intervalRef) {
			clearInterval(intervalRef);
			setIntervalRef(null);
		}
	}

	const	togglePlayPause = () => {
		if (videoUrl && videoRef.current) {
			setReplay(false);
			if (videoRef.current.paused) {
				videoRef.current.play();
				setIsPaused(false);
				startProgressLoop();
			} else {
				videoRef.current.pause();
				setIsPaused(true);
				stopProgressLoop();
			}
		}
	}

	const	handleVideoEnd = () => {
		setProgress(0);
		stopProgressLoop();
		setReplay(true);
	}

	return (
		<>
			<video
				ref={videoRef}
				type="video/mp4"
				autoPlay
				// controls
				src={videoUrl}
				poster={poster}
				onClick={togglePlayPause}
				onPlay={startProgressLoop}
				onPause={stopProgressLoop}
				onEnded={handleVideoEnd}
			/>

			<MdOutlineReplayCircleFilled
				className={ replay ? "replay-icon" : "replay-icon hidden" }
				onClick={togglePlayPause}
			/>

			<MdPauseCircleFilled
				className={ isPaused ? "paused-icon" : "paused-icon hidden" }
				onClick={togglePlayPause}
			/>

			<progress
				className={!replay ? "progressBar" : "progressBar hidden" }
				max={100}
				value={progress}
			/>
		</>
	);
}
