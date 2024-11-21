import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for performing navigation with an optional delay.
 *
 * @returns {Function} `redirect` - A function that performs navigation to a specified route after a delay.
 */
export const useRedirect = (): Function => {
    // Hook to access the navigate function from react-router-dom
    const navigate = useNavigate();

    /**
     * Navigates to a specified route after a delay.
     *
     * @param {string} route - The route to navigate to. Defaults to an empty string, which means no navigation will occur.
     * @param {number} duration - The delay before navigation, in milliseconds. Defaults to 1000 milliseconds (1 second).
     *
     * @returns {Promise<void>} A promise that resolves after the delay, triggering the navigation to the specified route.
     */
    const redirect = useCallback(async (route: string = '', duration: number = 1000) => {
        // Create a delay before navigation using a promise
        await new Promise<void>(resolve => setTimeout(resolve, duration));

        // Perform the navigation to the specified route
        navigate(route);
    }, [navigate]);

    // Return the `redirect` function to be used in components
    return redirect;
}