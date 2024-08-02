import React, { useEffect, useState } from 'react';

const ChatOpenAI = () => {
    const [joke, setJoke] = useState('');

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8000/chatopenai-streaming-endpoint');

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
            <h1 className='header-title'>AI ChatOpenAI Response</h1>
            <div className='text-response'>{joke}</div>
        </div>
    );
};

export default ChatOpenAI;