import React from 'react';
import './App.css';
import ChatCompletion from './components/main';
import ChatOpenAI from './components/chatopenai';
import AzureOpenAI from './components/azureopenai';

function App() {
  return (
    <div className="App">
        <ChatCompletion />
        <ChatOpenAI />
        <AzureOpenAI />
    </div>
  );
}

export default App;
