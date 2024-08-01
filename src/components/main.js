import React, { useEffect, useState } from 'react';

const AIJoke = () => {
    const [joke, setJoke] = useState('');

    useEffect(() => {
        
        function getEventSource(endpoint) {
            switch (endpoint) {
                case 'main':
                    return new EventSource('http://localhost:8000/main-streaming-endpoint');
                case 'chatopenai':
                    return new EventSource('http://localhost:8000/chatopenai-streaming-endpoint');
                case 'azureopenai':
                    return new EventSource('http://localhost:8000/azureopenai-streaming-endpoint');
                default:
                    throw new Error('Endpoint no válido');
            }
        }

        const endpoint = 'azureopenai';
        const eventSource = getEventSource(endpoint);

        eventSource.onmessage = function(event) {
            setJoke(prevJoke => prevJoke + event.data);
        };

        eventSource.onerror = function(event) {
            console.error("EventSource failed: ", event);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h1 className='header-title'>AI Joke Response</h1>
            <div>{joke}</div>
        </div>
    );
};

export default AIJoke;


