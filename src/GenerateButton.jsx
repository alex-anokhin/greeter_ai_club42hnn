import React from 'react';

function GenerateButton({onClick}) {
  return (
    <button className="generate-button" onClick={onClick}>Generate </button>
  );
}

export default GenerateButton;
