import React from "react";

export const	ScrollTo = () => {

	return (
		<button onClick={() => {
			window.scrollTo(
				{
					top: 0,
					left: 0,
					behaviour: "smooth"
				}
			)
		}}>Next</button>
	)
}