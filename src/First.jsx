import React, { useState } from 'react';
import Heroes from './Heroes';
import './index.css';

const FirstLayer = ({ id }) => {
    const hero = Heroes.find(hero => hero.id === id);
    const [name, setName] = useState('');
    const [event, setEvent] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEventChange = (e) => {
        setEvent(e.target.value);
    };

    const handleGenerateGreeting = () => {
        if (name.trim() !== '' && event.trim() !== '') {
            const greetingData = {
                id: hero.id,
                name: name.trim(),
                event: event.trim()
            };
            console.log(greetingData);
            setName('');
            setEvent('');
        } else {
            alert('Please fill out all fields before generating greeting.');
        }
    };

    if (!hero) {
        return <div>Error: Hero not found</div>;
    }

    return (
        <>      
        <div className="logo">
            <h1>Hero Greeting Generator</h1>
        </div>
        <div className="chosedContainer">
            <div className='img-cont'> 
                <img src={hero.image} alt={hero.name} className='chosedHero'/> 
            </div>
            <div className="input-cont">
                <input 
                    type="text" 
                    placeholder="For who greeting(Name)" 
                    className="input"
                    value={name}
                    onChange={handleNameChange}
                />
                <input 
                    type="text" 
                    placeholder="describe event(birthday)" 
                    className="input"
                    value={event}
                    onChange={handleEventChange}
                />
            </div>
            <button className="btn" onClick={handleGenerateGreeting}>Generate Greeting</button>
        </div>
        </>
    );
};

export default FirstLayer;
