import { useLayoutEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollerProps {
    /** The children elements that will be rendered inside the Scroller component */
    children: ReactNode;
}

/**
 * A component that scrolls the window to the top whenever the route changes.
 * This is useful in single-page applications to ensure that the user is taken
 * to the top of the page when navigating between different routes.
 *
 * @param {ScrollerProps} props - Props containing children components to be rendered.
 * @returns {JSX.Element} The rendered children elements.
 */
export function Scroller({ children }: ScrollerProps): JSX.Element {
    // Get the current location (pathname) from react-router-dom.
    const { pathname } = useLocation();

    /**
     * useLayoutEffect hook is similar to useEffect, but it fires synchronously
     * after all DOM mutations. It ensures that the window is scrolled to the top
     * before the browser paints the next frame.
     *
     * The effect is triggered whenever the `pathname` changes, meaning the user
     * has navigated to a different route.
     */
    useLayoutEffect(() => {
        // Scroll the window to the top-left corner with smooth behavior.
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [pathname]); // The effect runs whenever the pathname changes.

    // Render the children elements that were passed into the Scroller component.
    return <>{children}</>;
};