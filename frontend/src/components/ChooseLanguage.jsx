import PanelLanguage from "./PanelLanguage";

export const	ChooseLanguage = ({name, setLanguage}) => {
	return (
		<>
			<h2 className="textarea-title">
				Choose {name}'s language:
			</h2>
			<PanelLanguage setLang={setLanguage} />
		</>
	);
}