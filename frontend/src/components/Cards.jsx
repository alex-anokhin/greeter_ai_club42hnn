import useVideoResult2Store from "../stores/videoResult2Store";

export const	Cards = ({heroes, heroIdx, setHeroIdx, setVideoUrl, setMuted, setResonseText}) => {

	const	setIsPaused = useVideoResult2Store(state => state.setIsPaused);
	const	setProgress = useVideoResult2Store(state => state.setProgress);
	const	setReplay = useVideoResult2Store(state => state.setReplay);
	const	intervalRef = useVideoResult2Store(state => state.intervalRef);
	const	setIntervalRef = useVideoResult2Store(state => state.setIntervalRef);

	const	stopProgressLoop = () => {
		if (intervalRef) {
			clearInterval(intervalRef);
			setIntervalRef(null);
		}
	}

	return (
		<div className="cards">
			{heroes.map((item, idx) => {
				return (
					<button key={idx} className={`thumb thumb-${Math.abs(heroIdx - idx)}`} onClick={() => {
							setHeroIdx(idx);
							setVideoUrl("");
							setMuted(false);
							setResonseText("");

							// reset Result video component
							stopProgressLoop();
							setIsPaused(false);
							setProgress(0);
							setReplay(false);
						}} >
						<img src={item.image} alt={item.name} />
					</button>
				)
			})}
		</div>
	);
}
