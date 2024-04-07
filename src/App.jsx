
import React, { useState } from 'react';
import Heroes from './Heroes';
import FirstLayer from './First';
import SwitchHero from './SwitchHero';

function App() {

  const [approved, setApproved] = useState(false);
  const [tmp, setTmp] = useState(Heroes[0].id);
  const handleSelection = () => {
    setApproved(true);
  };

    if (approved) {
      return <FirstLayer id = {tmp}/>;
    }
    else {
      return <SwitchHero onSelection={handleSelection} setTmp={setTmp}/>;
    }
}

export default App;
