import React, { useState } from 'react';
import './App.css'; 
import Heroes from './Heroes';

function SwitchHero({ onSelection, setTmp}) {
    const [activeHero, setActiveHero] = useState(Heroes[0].id);


    const handleHeroClick = (id) => {
        setActiveHero(id);
    };

    const handleSelection = () => {
        setTmp(activeHero); 
        onSelection(); 
    };

    return (
        <div className="container">
            {Heroes.map(hero => (
                <div
                    key={hero.id}
                    className={hero.id === activeHero ? 'slide active' : 'slide'}
                    style={{ backgroundImage: `url(${hero.image})` }}
                    onClick={() => handleHeroClick(hero.id)}
                >
                    <h3>{hero.name}</h3>
                </div>
            ))}
            <div className="btn-container"> 
                <button className="btn" onClick={handleSelection}>Select Hero</button>
            </div>
        </div>
    );
}

export default SwitchHero;
