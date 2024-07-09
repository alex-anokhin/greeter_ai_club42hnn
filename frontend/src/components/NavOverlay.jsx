import { TbSquareRoundedChevronLeftFilled, TbSquareRoundedChevronRightFilled } from "react-icons/tb";
import { ScrollToSection } from './ScrollToSection';
import { useEffect } from "react";
import useVideoResult2Store from "../stores/videoResult2Store";

export const	NavOverlay = ({heroes, heroIdx, setHeroIdx, setVideoUrl, setMuted}) => {

	const	replay = useVideoResult2Store(state => state.replay);
	const	setReplay = useVideoResult2Store(state => state.setReplay);

	const	nextSlide = () => {
		setHeroIdx(heroIdx === heroes.length - 1 ? 0 : heroIdx + 1);
		setVideoUrl("");
		setMuted(false);
		setReplay(false);
	};

	const	previousSlide = () => {
		setHeroIdx(heroIdx === 0 ? heroes.length - 1 : heroIdx - 1);
		setVideoUrl("");
		setMuted(false);
		setReplay(false);
	};

	// useEffect(() => {
	// 	const	handleKeyDown = (event) => {
	// 		if (event.key === 'ArrowRight') {
	// 			nextSlide();
	// 		} else if (event.key === 'ArrowLeft') {
	// 			previousSlide();
	// 		}
	// 	}
	// 	document.addEventListener('keydown', handleKeyDown);
	// 	return () => document.removeEventListener('keydown', handleKeyDown);
	// }, [heroIdx]);

	return (
		<>
			<TbSquareRoundedChevronLeftFilled
					className="arrow arrow-left"
					onClick={previousSlide}
				/>

			<TbSquareRoundedChevronRightFilled
				className="arrow arrow-right"
				onClick={nextSlide}
			/>
			<ScrollToSection idx={2} type={'DOWN'} setMuted={setMuted} />
		</>
	);
}
