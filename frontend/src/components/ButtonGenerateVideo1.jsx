import React, { useState } from 'react';
import useGenerateVideoStore from "../stores/generateVideoStore";
import useVideoResult2Store from "../stores/videoResult2Store";
import { ButtonGenerate } from "./ButtonGenerate";
import { Timer } from "./Timer";

export const	ButtonGenerateVideo = ({phrase, persona, lang, setVideoUrl, tempVideo}) => {

	const	loading = useGenerateVideoStore(state => state.loading);
	const	setLoading = useGenerateVideoStore(state => state.setLoading);

	const	setIsPaused = useVideoResult2Store(state => state.setIsPaused);
	const	setProgress = useVideoResult2Store(state => state.setProgress);
	const	setReplay = useVideoResult2Store(state => state.setReplay);
	const	intervalRef = useVideoResult2Store(state => state.intervalRef);
	const	setIntervalRef = useVideoResult2Store(state => state.setIntervalRef);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [resetTimer, setResetTimer] = useState(false);

	const	stopProgressLoop = () => {
		if (intervalRef) {
			clearInterval(intervalRef);
			setIntervalRef(null);
		}
	}

	const	handleGetVideoButtonClick = (event) => {
		event.preventDefault();
		setLoading(true);
		setIsTimerActive(false); // Stop the timer
        setResetTimer(prev => !prev); // Reset the timer
		setIsTimerActive(true);
		setVideoUrl('');

		// reset Result video component
		stopProgressLoop();
		setIsPaused(false);
		setProgress(0);
		setReplay(false);

		// fetch('https://choice-goose-loved.ngrok-free.app/infer_image', {
		// fetch('https://longhorn-verified-tetra.ngrok-free.app/infer_image', {
		fetch('http://localhost:8081/infer_image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': "*/*"
			},
			body: JSON.stringify({
				"text": phrase,
				"persona": persona,
				"language": lang,
				"face_restorer": "None",
			})
		})
		.then(response => {
			setLoading(false);
			setIsTimerActive(false);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.blob();
		})
		.then(blob => {
			setVideoUrl(URL.createObjectURL(blob));
		})
		.catch(error => {
			setLoading(false);
            setIsTimerActive(false);
			console.error('Error:', error);
		});
	};

	const	emulator = (event) => {
		event.preventDefault();
		setLoading(true);
		setIsTimerActive(false); // Stop the timer
        setResetTimer(prev => !prev); // Reset the timer
        setIsTimerActive(true); // Start the timer
		setVideoUrl('');

		// reset Result video component
		stopProgressLoop();
		setIsPaused(false);
		setProgress(0);
		setReplay(false);

		setTimeout(() => {
			setLoading(false);
			setIsTimerActive(false);
			setVideoUrl(tempVideo);
		}, 7000);
	}

	return (
		<>
			<ButtonGenerate
				caption="Generate Video"
				loading={loading}
				handleOnClick={handleGetVideoButtonClick}
			/>
		</>
	);
}