import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling navigation with optional delay and conditional routing.
 *
 * @returns {Function} `go` - A function that performs navigation after a specified delay.
 */
export const useGo = (): Function => {
    // Hook to access the navigate function from react-router-dom
    const navigate = useNavigate();

    /**
     * Navigates to a specified route after a delay. If the history state indicates that there
     * is a previous page in the history stack, it navigates back instead of going to the specified route.
     *
     * @param {string} route - The route to navigate to. Defaults to an empty string, which means no navigation will occur.
     * @param {number} duration - The delay before navigation, in milliseconds. Defaults to 1000 milliseconds (1 second).
     *
     * @returns {Promise<void>} A promise that resolves after the delay, which triggers the navigation.
     */
    const go = useCallback(async (route: string = '', duration: number = 1000) => {
        // Create a delay before navigation using a promise
        await new Promise<void>(resolve => setTimeout(resolve, duration));

        // Check if there is a previous page in the history stack
        if (window.history.state && window.history.state.idx > 0) {
            // Navigate back to the previous page if available
            navigate(-1);
        } else {
            // Otherwise, navigate to the specified route
            navigate(route);
        }
    }, [navigate]);

    // Return the `go` function to be used in components
    return go;
}