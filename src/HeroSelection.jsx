import React, { useState } from 'react';
import BatMan from './img/batman.jpeg'
import Mickie from './img/mickeymouse.webp'
import Santa from './img/santa.jpeg'
import W_Woman from './img/wonder_woman.jpeg'

function HeroSelection() {

  const heroes = [
    { id: 1, name: "Batman", image: BatMan },
    { id: 2, name: "Mickey Mouse", image: Mickie },
    { id: 3, name: "Santa Claus", image: Santa },
    { id: 4, name: "Wonder Woman", image: W_Woman }
  ];

 const handleHeroSelect = (hero) =>
{
  console.log((hero.name));
};


  return (
    <div className="hero-selection">
      <h3 className="hero-label">Select a hero:</h3>
      {/* Hero thumbnails */}
      <div className="hero-container">
        {heroes.map(hero => (
          <div key={hero.id} className='hero-thumbnail' onClick={() => handleHeroSelect(hero)}>
            <img src={hero.image} alt={hero.name} />
            <p>{hero.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSelection;
