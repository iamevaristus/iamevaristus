import { ThemeInterface } from "./Theme";

/**
 * Dark theme configuration for the application, defining the primary colors
 * and other theme-specific properties. This theme is implemented as part of the
 * application's theming system and follows the `ThemeInterface`.
 *
 * @see ThemeInterface
 */
export const DarkTheme: ThemeInterface = {
    /**
     * Primary color used across the app (e.g., buttons, highlights).
     * This is the dominant dark shade for the dark theme.
     */
    primary: "#ffffff", // Very dark shade, almost black.

    /**
     * Secondary color used for text, icons, and other UI elements.
     * Typically white or light shades in dark themes for contrast.
     */
    secondary: "#050404", // White for clear contrast with dark backgrounds.

    /**
     * Darker shade for the app bar, providing a clear header or toolbar color.
     * Usually darker than the primary color to differentiate the app bar from content.
     */
    appbarDark: "#212836", // Dark grey-blue, providing a subtle distinction from primary.

    /**
     * Lighter shade for the app bar when switching to light elements on a dark background.
     * Used for top-level elements where contrast with darker shades is needed.
     */
    appbarLight: "#e3e3e3", // Light grey, used for contrast in app bar.

    /**
     * Darker variation of the primary color, used for specific components
     * or areas where a more muted dark tone is necessary.
     */
    primaryDark: "#14181B", // A deep dark grey-blue.

    /**
     * Lighter variation of the primary color, useful for hovering effects
     * or light accents within the dark theme.
     */
    primaryLight: "#14181BAF", // Light grey for accents or background highlights.

    /**
     * Color for hint text or placeholders (e.g., input fields or disabled text).
     * Typically a lighter, more subdued color to indicate secondary information.
     */
    hint: '#8B95A9', // Muted grey-blue for placeholder or disabled text.

    /**
     * Color used for error messages, warning states, or validation errors.
     * Red is often chosen to quickly catch the user's attention.
     */
    error: '#E14747', // Bright red to signal errors or critical issues.

    /**
     * Color used for success messages or positive states (e.g., form submissions).
     * Green is commonly used to indicate success or "go" actions.
     */
    success: '#32A94C', // Bright green to indicate successful operations.

    /**
     * Color indicating pending actions or states waiting for confirmation.
     * Often a yellow or orange shade to indicate caution or ongoing processes.
     */
    pending: "#908319", // Muted yellow-gold to signal pending actions.
};