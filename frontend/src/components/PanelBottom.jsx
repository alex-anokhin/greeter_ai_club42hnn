export const	PannelBottom = ({name, randomPhrase}) => {
	return (
		<div className="bottom-panel">
			<div className="titel-container">
				<h1 className="hero-name">{name}</h1>
				<span>{randomPhrase}</span>
			</div>
		</div>
	);
}
