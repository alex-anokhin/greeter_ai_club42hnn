import React, { useState, useRef, useEffect } from 'react';

export const Timer = ({ isActive }) => {
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            setTime(0);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 0.01);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    return (
        // <div className="timer-container">
        //     <div className="circle-loader">
                    // <div className="circle"></div>
                    // <div className='timer-title'>elapsed:</div>
                    // <div className='time-display'>Elapsed:{time.toFixed(2)}s</div>
            // </div>
            <div className='timer-container'>
                <div className='timer-title'>Elapsed:</div>
                <div className='value-container'>
                    <div className='timer-value'>{time < 100.0 ? time.toFixed(2) : time.toFixed(1)}</div>
                    <div className='timer-seconds'>sec</div>
                </div>
                {/* Elapsed: {time.toFixed(2)}s */}
            </div>
        // </div>
    );
};

