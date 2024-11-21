import { useState, useEffect } from 'react';

/**
 * Custom hook to track the window width and update state on window resize.
 *
 * @returns {number} The current width of the window.
 */
export function useWidth(): number {
    // State to hold the current window width
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Function to update the width state when the window is resized
        function handleResize() {
            setWidth(window.innerWidth);
        }

        // Add event listener for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    // Return the current window width
    return width;
}