export const	VideoIntro = ({poster, src, muted, setMuted}) => {

	const	handleOnEnded = (event) => {
		if (!muted) {
			setMuted(true);
		}
		event.target.play();
	}

	return (
		<video
			autoPlay
			loop={muted ? true : false}
			muted={muted ? true : false}
			poster={poster}
			src={src}
			className="slide"
			onEnded={handleOnEnded}
		/>
	);
}
