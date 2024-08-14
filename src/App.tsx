// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Preview from './components/Preview/Preview';

const App: React.FC = () => {
  const defaultCode = `
// Write some React component
// Hooks available: useState & useEffect

const Welcome = () => {
    const [name, setName] = useState('Foo');
    
    return (
        <div className='Welcome'>
            <div className='main-container'>
                <span>Welcome <strong>{name}</strong>!</span>
                <p>You can execute your code by clicking the <strong>Run</strong> button above or pressing <strong>Ctrl + Enter</strong>.</p>
            </div>
        </div>
    );
};

export default Welcome;`;

  const defaultStyles = `
/* Write some styles for your React component */

.Welcome {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.Welcome .main-container {
    border-radius: .5em;
    box-shadow: 0 .75em 1.2em .2em #a1a1a1;
    padding: 1.5em;
    width: 75%;
}

.Welcome .main-container span,
.Welcome .main-container p {
    font-size: 1.3em;
}
`;

  const [code, setCode] = useState<string>(defaultCode);
  const [styles, setStyles] = useState<string>(defaultStyles);

  return (
    <div className="App">
      <CodeEditor code={code} onCodeChange={setCode} styles={styles} onStyleChange={setStyles} />
      <Preview code={code} styles={styles} />
    </div>
  );
};

export default App;
