import { useState, useEffect } from 'react';

/**
 * Custom hook to track the window height and update state on window resize.
 *
 * @returns {number} The current height of the window.
 */
export function useHeight(): number {
    // State to hold the current window height
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        // Function to update the height state when the window is resized
        function handleResize() {
            setHeight(window.innerHeight);
        }

        // Add event listener for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    // Return the current window height
    return height;
}