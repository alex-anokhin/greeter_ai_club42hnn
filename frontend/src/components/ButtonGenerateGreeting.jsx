import useGreetingStore from "../stores/greetingStore";
import { ButtonGenerate } from "./ButtonGenerate";

export const	ButtonGenerateGreeting = ({ name, greetText, language, setDotIndex, setVideoUrl, setResponseText }) => {

	const loading = useGreetingStore(state => state.loading);
	const setLoading = useGreetingStore(state => state.setLoading);

	const	generateGreeting = (name, language) => {
		if (name === "") {
			name = "Elsa from Frozen";
		}
		let model = language === 'English' ? "llama3" : "aya";
		// console.log("model: ", model);
		const	requestData2 = {
			"model": model,
			"messages": [
				{
					"role": "system",
					"contffent": `Reply as ${name}, use only ${language} language for reply, If you find name talk to this person, be friendly, say Hello and who you are first, use your English name ${name} in any language, use 5 sentances for answer, do not use emojies or hashtags, use most well known phrase from your movie in ${language}.`
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
		// fetch('http://localhost:8081/infer_text', {
		fetch('api/infer_text', {
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
		event.preventDefault();
		setDotIndex(0);
		setLoading(true);
		setVideoUrl("");
		generateGreeting(name, language);

		// emulate waiting from backend
		// DELETE/COMMENT from HERE
		/*setTimeout(() => {
			setResponseText("Super Duper Greeting from super hero!");
			setLoading(false);
		}, 7000);*/
		// Til HERE */
	};

	return (
		<ButtonGenerate
			caption="Generate Greeting"
			loading={loading}
			handleOnClick={handleGenerateButtonClick}
		/>
	);
}

/*import React, { useCallback, useEffect } from 'react';
import useGreetingStore from "../stores/greetingStore";
import { ButtonGenerate } from "./ButtonGenerate";

export const ButtonGenerateGreeting = ({ name, greetText, language, setDotIndex, setVideoUrl, setResponseText, onGenerate }) => {
    const loading = useGreetingStore(state => state.loading);
    const setLoading = useGreetingStore(state => state.setLoading);

    const generateGreeting = useCallback((name, language, greetText) => {
        if (name === "") {
            name = "Elsa from Frozen";
        }
        let model = language === 'English' ? "llama3" : "aya";
        const requestData2 = {
            "model": model,
            "messages": [
                {
                    "role": "system",
                    "content": `Reply as ${name}, use only ${language} language for reply, If you find name talk to this person, be friendly, say Hello and who you are first, use your English name ${name} in any language, use less than 50 words for answer, do not use emojies or hashtags, use most well known phrase from your movie in ${language}.`
                },
                {
                    "role": "user",
                    "content": greetText
                }
            ],
            "stream": false,
            "options": {
                "temperature": 0.8,
                "stop": ["#", "(", "*", "Translation:", "Translation", "Translation :"],
                "num_predict": 99,
                "top_p": 0.5,
                "top_k": 50,
                "presence_penalty": 0.9,
            }
        };

        fetch('https://longhorn-verified-tetra.ngrok-free.app/infer_text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(requestData2)
        })
        .then(response => response.json())
        .then(responseJson => {
            setLoading(false);
            const text = responseJson.text.trim();
            const words = text.split(' ');
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
    }, [setLoading, setResponseText]);

    const handleGenerateButtonClick = useCallback((event) => {
        event.preventDefault();
        setDotIndex(0);
        setLoading(true);
        setVideoUrl("");
        generateGreeting(name, language, greetText);
    }, [name, language, greetText, generateGreeting, setDotIndex, setLoading, setVideoUrl]);

    useEffect(() => {
        onGenerate.current = handleGenerateButtonClick;
    }, [handleGenerateButtonClick, onGenerate]);

    return (
        <ButtonGenerate
            caption="Generate Greeting"
            loading={loading}
            handleOnClick={handleGenerateButtonClick}
        />
    );
}*/
