import React, { useRef, useEffect } from 'react';
// import { ButtonGenerateGreeting } from "./ButtonGenerateGreeting";
import { ButtonGenerate } from './ButtonGenerate';
import useGreetingStore from '../stores/greetingStore';

export const	BlockGenerateGreeting = ({name, greetText, language, setGreetText, setDotIndex, setVideoUrl, setResponseText}) => {

	const loading = useGreetingStore(state => state.loading);
	const setLoading = useGreetingStore(state => state.setLoading);

	const	generateGreeting = (name, language) => {
		if (name === "") {
			name = "Elsa from Frozen";
		}
		const sent_num = 3;
		let model = language === 'English' ? "llama3" : "aya";
		// console.log("model: ", model);
		const	requestData2 = {
			"model": model,
			"messages": [
				{
					"role": "system",
					"content": `Reply as ${name}, use only ${language} language for reply, If you find name talk to this person, be friendly, say Hello and who you are first, use your English name ${name} in any language, use ${sent_num} sentances for answer, do not use emojies or hashtags, use most well known phrase from your movie in ${language}.`
				},
				{
					"role": "user",
					"content": greetText
				}
			],
			"stream": false,
			"options": {
			// "max_tokens": 100,
			"temperature": 0.8,
			"stop": ["#", "(", "*", "Translation:", "Translation", "Translation :"],
			"num_predict": 99,
			"top_p": 0.5,
			"top_k": 50,
			"presence_penalty": 0.9,}
		};

		// fetch('http://localhost:11434/api/chat', {
		fetch('http://localhost:8081/infer_text', {
		// fetch('api/infer_text', {
		// fetch('https://choice-goose-loved.ngrok-free.app/infer_text', {
		// fetch('https://longhorn-verified-tetra.ngrok-free.app/infer_text', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify(requestData2)
		})
		.then(response => response.json())
		.then(responseJson => {
			setLoading(false);
			// const	text = responseJson.message.content.trim();
			const	text = responseJson.text.trim();
			const	words = text.split(' ');
			let displayText = "";
			words.forEach((word, index) => {
				setTimeout(() => {
					displayText += (index > 0 ? ' ' : '') + word;
					setResponseText(displayText);
				}, index * 25);
			});
		})
		.catch(error => {
			setLoading(false);
			 console.error('Error fetching or parsing data:', error);
			setResponseText("Error fetching or parsing data from server. Please try again.");
		});
	};

	const handleGenerateButtonClick = (event) => {
		// event.preventDefault();
		setDotIndex(0);
		setLoading(true);
		setVideoUrl("");
		generateGreeting(name, language);
	}

	// const textareaRef = useRef(null);
	// const buttonRef = useRef(null);

	// useEffect(() => {
	// 	const handleFocus = () => {
	// 	textareaRef.current.select();
	// 	};

	// 	const textarea = textareaRef.current;
	// 	textarea.addEventListener('focus', handleFocus);

	// 	return () => {
	// 	textarea.removeEventListener('focus', handleFocus);
	// 	};
	// }, []);
	return (
		<>
			<h2 className="textarea-title">Ask {name}:</h2>

			<textarea
				//ref={textareaRef}
				className="textarea-prompt"
				placeholder="ask something to say..."
				value={greetText}
				onChange={(e) => setGreetText(e.target.value)}
				onKeyDown={(e) => {e.key === 'Enter' ? handleGenerateButtonClick() : null}}
			/>

			<ButtonGenerate
				// ref={buttonRef}
				caption="Generate Greeting"
				loading={loading}
				handleOnClick={handleGenerateButtonClick}
			/>
			{/* <ButtonGenerateGreeting
				name={name}
				greetText={greetText}
				language={language}
				setDotIndex={setDotIndex}
				setVideoUrl={setVideoUrl}
				setResponseText={setResponseText}
			/> */}
		</>
	);
}

/*import React, { useRef, useEffect, useCallback } from 'react';
import { ButtonGenerateGreeting } from "./ButtonGenerateGreeting";

export const BlockGenerateGreeting = ({ name, greetText, language, setGreetText, setDotIndex, setVideoUrl, setResponseText }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const handleFocus = () => {
            textareaRef.current.select();
        };

        const textarea = textareaRef.current;
        textarea.addEventListener('focus', handleFocus);

        return () => {
            textarea.removeEventListener('focus', handleFocus);
        };
    }, []);

    const handleGenerateGreeting = useCallback(() => {
        // Your logic for generating the greeting
    }, [name, language, greetText]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            // e.preventDefault(); // Prevent the default behavior (like submitting the form)
            handleGenerateGreeting(); // Trigger the generate function
        }
    }, [handleGenerateGreeting]);

    return (
        <form className="form-textgen">
            <h2 className="textarea-title">Ask {name}:</h2>

            <textarea
                ref={textareaRef}
                className="textarea-prompt"
                placeholder="ask something to say..."
                value={greetText}
                onChange={(e) => setGreetText(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <ButtonGenerateGreeting
                name={name}
                greetText={greetText}
                language={language}
                setDotIndex={setDotIndex}
                setVideoUrl={setVideoUrl}
                setResponseText={setResponseText}
                onGenerate={handleGenerateGreeting}
            />
        </form>
    );
}*/
