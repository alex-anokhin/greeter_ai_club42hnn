import React from 'react';

function GreetingInput({value, setGreting}) {

  return (
    <div className="greeting-input">
      <label htmlFor="greeting-text">Describe your greeting:</label>
      <input type="text" id="greeting-text" placeholder="Enter your greeting..." value={value} onChange={setGreting} />
    </div>
  );
}

export default GreetingInput;
