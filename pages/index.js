import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const onUserChangedText = (event) => {
    // console.log(event.target.value);
    setUserInput(event.target.value); 
  };

  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('Calling OpenAI...');
    // call our API, NextJS creates route with api/generate.js
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    // pull the output using object destructuring https://www.javascripttutorial.net/es6/javascript-object-destructuring/?utm_source=buildspace.so&utm_medium=buildspace_project
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Travel to the dark side of your mind with Horror Tales!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Horror Tales invites you to explore the deepest, darkest corners of your mind!</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <textarea 
            className='prompt-box'
            placeholder='Name your main characters in the story...'
            value={userInput}
            onChange={onUserChangedText} 
          />
          <div className='prompt-buttons'>
            <a 
            // use ternary operator https://www.javascripttutorial.net/javascript-ternary-operator/?utm_source=buildspace.so&utm_medium=buildspace_project
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
            >
              {/* use ternary operator https://www.javascripttutorial.net/javascript-ternary-operator/?utm_source=buildspace.so&utm_medium=buildspace_project */}
              <div className='generate'>
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* GPT-3's output */}
          {apiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header'>
                  <h3>Output</h3>
                </div>
              </div>
              <div className='output-content'>
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
