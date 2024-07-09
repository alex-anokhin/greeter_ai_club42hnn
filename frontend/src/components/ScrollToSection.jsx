import React from "react";
import { TbSquareRoundedChevronsDownFilled, TbSquareRoundedChevronsUpFilled } from "react-icons/tb";

export const	ScrollToSection = ({idx, type, setMuted}) => {
	if (type === 'UP')
		return (
			<div className="user-guide">
				{/* <div className="accent instruction">to characters</div> */}
	<TbSquareRoundedChevronsUpFilled className="arrow arrow-up" onClick={() => {
		const	element = document.getElementById(`section-${idx}`);
		element.scrollIntoView({behavior: 'smooth'});
	}}/></div>
	)
	else
		return (
			<div className="user-guide">
				<div className="instruction">to generation</div>
			<TbSquareRoundedChevronsDownFilled className="arrow arrow-bottom" onClick={() => {
				setMuted(true);
				const	element = document.getElementById(`section-${idx}`);
				element.scrollIntoView({behavior: 'smooth'});
			}}/>
			</div>
		)
}
