import React, { useEffect, useState } from 'react';

const ChatCompletion = () => {
    const [joke, setJoke] = useState('');

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8000/main-streaming-endpoint');

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
            <h1 className='header-title'>AI chat.completions Response</h1>
            <div className='text-response'>{joke}</div>
        </div>
    );
};

export default ChatCompletion;


