import React from "react";

const	Section = ({sec_id, children}) => {
	return (
		<div className="section" id={sec_id}>
			{children}
		</div>
	)
}

export default Section
