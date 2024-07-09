import React, { useState } from 'react';

const	PanelLanguage = ({ setLang }) => {

	const	[activeLang, setActiveLang] = useState('English');
	const	langMap = {
		'English': 'en',
		'German': 'de',
		'Spanish': 'es',
		'Italian': 'it',
		'French': 'fr',
		'Russian': 'ru'
	};

	const	handleLangChange = (lang) => {
		setActiveLang(lang); // Update the active language state
		setLang({ full: lang, code: langMap[lang] }); // Update the language in the parent component
	};

	return (
		<div className='lang-panel-container'>
			<div className='button-container'>
				{Object.keys(langMap).map((lang) => (
				<button
					key={lang}
					className={`lang-button ${activeLang === lang ? 'active' : ''}`}
					onClick={() => handleLangChange(lang)}
				>
					{langMap[lang].toUpperCase()}
				</button>
				))}
			</div>
		</div>
	);
}

export default PanelLanguage;
