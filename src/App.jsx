import React, {useState} from 'react';
import Layout from './Layout/Layout';
import GreetingInput from './GreetingInput';
import HeroSelection from './HeroSelection';
import GenerateButton from './GenerateButton';
import MediaPlayer from './MediaPlayer';
import ShareSaveButtons from './ShareSaveButtons';
import './App.css';

function App() {

  const [greeting, setGreting] = useState("");
  const [prevInput, setPrevInput] = useState("");

  const handleGreetingChange = (event) => {
    setGreting(event.target.value);
    setPrevInput(event.target.value);
  };

  const onGenerate = () => {
    setGreting("");
    console.log(prevInput)
    setPrevInput("");
  };

  return (
    <Layout>
      <GreetingInput  setGreting = {handleGreetingChange} value = {greeting} />
      <HeroSelection />
      <GenerateButton onClick={onGenerate} /> 
      <MediaPlayer />
      <ShareSaveButtons />
    </Layout>
  );
}

export default App;
