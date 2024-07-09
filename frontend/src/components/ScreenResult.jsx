import React, { useEffect, useState } from "react";
import { ScrollToSection } from "./ScrollToSection";
import { MyQRCode } from "./MyQRCode";
// import { ButtonGenerateVideo } from "./ButtonGenerateVideo";
import { VideoResult2 } from "./VideoResult2";
import { PannelBottom } from "./PanelBottom";
import { ChooseLanguage } from "./ChooseLanguage";
import { BlockGenerateGreeting } from "./BlockGenerateGreeting";
import { Timer } from "./Timer";

import useGreetingStore from "../stores/greetingStore";
import useGenerateVideoStore from "../stores/generateVideoStore";
import { ButtonGenerate } from "./ButtonGenerate";
import useVideoResult2Store from "../stores/videoResult2Store";

export const	ScreenResult = ({ heroes, heroIdx, videoUrl, setVideoUrl, responseText, setResponseText }) => {
	const [greetText, setGreetText] = useState("greet my son (his name is Steven) for seventh birthday");
	const [language, setLanguage] = useState({ full: 'English', code: 'en' });
	const [dotIndex, setDotIndex] = useState(0);
	const [randomPhrase, setRandomPhrase] = useState("");
	const phrases = [
		"adjusting the lighting",
		"positioning the camera",
		"tidying the background",
		"choosing the outfit",
		"practicing posture",
		"calming the nerves",
		"setting up the microphone",
		"applying the makeup",
		"doing the hair"
	];

	const getRandomPhrase = (phrases) => {
		const randomIndex = Math.floor(Math.random() * phrases.length);
		return phrases[randomIndex];
	}

	const	loading = useGreetingStore(state => state.loading);
	useEffect(() => {
		const dotInterval = setInterval(() => {
			if (loading) {
				setDotIndex((dotIndex + 1) % 4);
				setResponseText("Loading" + ".".repeat(dotIndex));
			}
		}, 333);
		return () => clearInterval(dotInterval);
	}, [loading, dotIndex]);

	const	phraseLoading = useGenerateVideoStore(state => state.loading);
	useEffect(() => {
		const	phraseInterval = setInterval(() => {
			if (phraseLoading) {
				setRandomPhrase("is " + getRandomPhrase(phrases));
			} else {
				setRandomPhrase("");
			}
		}, 2500);
		return () => clearInterval(phraseInterval);
	}, [phraseLoading]);



	const	loadingVid = useGenerateVideoStore(state => state.loading);
	const	setLoadingVid = useGenerateVideoStore(state => state.setLoading);

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
		// event.preventDefault();
		setLoadingVid(true);
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
		// fetch('http://localhost:8081/infer_image', {
		fetch('api/infer_image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': "*/*"
			},
			body: JSON.stringify({
				"text": responseText,
				"persona": heroes[heroIdx].name,
				"language": language.code,
				"face_restorer": "None",
			})
		})
		.then(response => {
			setLoadingVid(false);
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
			setLoadingVid(false);
            setIsTimerActive(false);
			console.error('Error:', error);
		});
	};

	return (
		<div className="screen-result">
			<div className="img-hero">

				<VideoResult2
					poster={heroes[heroIdx].image}
					videoUrl={videoUrl}
				/>

				<PannelBottom
					name={heroes[heroIdx].name}
					randomPhrase={randomPhrase}
				/>
			</div>

			<div className="side-panel">
				<div className="communication-with-user">

					<ChooseLanguage
						name={heroes[heroIdx].name}
						setLanguage={setLanguage}
					/>

					<BlockGenerateGreeting
						name={heroes[heroIdx].name}
						greetText={greetText}
						language={language.full}
						setGreetText={setGreetText}
						setDotIndex={setDotIndex}
						setVideoUrl={setVideoUrl}
						setResponseText={setResponseText}
					/>
					<div className="time-hint">⏱ expected generation time: ~10sec</div>

					<h2 className="textarea-title">{heroes[heroIdx].name} will say:</h2>
					<textarea
						id="responseText"
						className="textarea-prompt"
						value={responseText}
						onChange={(event) => setResponseText(event.target.value)}
						onKeyDown={(event) => event.key === 'Enter' ? handleGetVideoButtonClick() : null}
					/>

					<ButtonGenerate
						caption="Generate Video"
						loading={loadingVid}
						handleOnClick={handleGetVideoButtonClick}
					/>
					{/* <ButtonGenerateVideo
						phrase={responseText}
						persona={heroes[heroIdx].name}
						lang={language.code}
						setVideoUrl={setVideoUrl}
						tempVideo={heroes[heroIdx].video} // del
					/> */}
					<div className="time-hint">⏱ expected generation time: ~1 min</div>

					<Timer isActive={loading || phraseLoading} />

					<MyQRCode
						persona={heroes[heroIdx].name}
						value={responseText}
						videoUrl={videoUrl}
					/>
				</div>

				<ScrollToSection idx={1} type={'UP'} />

			</div>
		</div>
	);
};
