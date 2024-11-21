import { createTheme, ThemeProvider } from '@mui/material';
import { WebUiKitException } from './exception/WebUiKitException';
import React from 'react';
import { ToastContainer } from 'react-toastify';

/**
 * Interface for screen orientation breakpoints used in the application.
 *
 * Defines the pixel width at which different screen sizes are considered:
 * - mobile: Maximum width for mobile devices.
 * - tablet: Minimum width for tablets.
 * - desktop: Minimum width for desktop devices.
 */
interface ScreenOrientation {
    mobile: number;
    tablet: number;
    desktop: number;
}

/**
 * Interface for the context provided by WebUiKit.
 *
 * - screenOrientation: Current breakpoints for different screen sizes.
 * - updateScreenOrientation: Function to update the screen orientation breakpoints.
 */
interface WebUiKitContextProps {
    screenOrientation: ScreenOrientation;
    updateScreenOrientation: React.Dispatch<React.SetStateAction<ScreenOrientation>>;
}

/**
 * Create a React Context for the WebUiKit with an optional default value.
 *
 * The context provides access to screen orientation breakpoints and a function to update them.
 */
const WebUiKitContext = React.createContext<WebUiKitContextProps | undefined>(undefined);

/**
 * Custom hook to use the WebUiKit context.
 *
 * @throws {WebUiKitException} If used outside of a WebUiKitProvider, throws an exception.
 *
 * @returns The current context value containing screen orientation and updater function.
 */
export const useWebUiKit = (): WebUiKitContextProps => {
    const context = React.useContext(WebUiKitContext);
    if (context === undefined) {
        throw new WebUiKitException('useWebUiKit must be used within WebUiKit');
    }
    return context;
};

/**
 * Props interface for the WebUiKit component.
 *
 * - children: React nodes to be rendered inside the WebUiKit component.
 */
interface WebUiKitProps {
    children: React.ReactNode;
}

/**
 * WebUiKit component that provides context for screen orientation and integrates Toast notifications.
 *
 * - Initializes screen orientation breakpoints with default values.
 * - Wraps children components with the WebUiKitContext.Provider.
 * - Includes ToastContainer for displaying toast notifications.
 *
 * @param {WebUiKitProps} props - Properties for the component including children.
 *
 * @returns A React element wrapping the children with context and Toast notifications.
 */
export const WebUiKit = ({ children }: WebUiKitProps): React.ReactElement => {
    // State for managing screen orientation breakpoints
    const [screenOrientation, updateScreenOrientation] = React.useState<ScreenOrientation>({
        tablet: 768,
        desktop: 1024,
        mobile: 768
    });

    const muiTheme = createTheme({
        typography: {
            fontFamily: [
                'Nunito',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif'
            ].join(','),
        }
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <ToastContainer />
            <WebUiKitContext.Provider value={{ screenOrientation, updateScreenOrientation }}>
                {children}
            </WebUiKitContext.Provider>
        </ThemeProvider>
    );
};