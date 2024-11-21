import { ThemeInterface } from "./Theme";

/**
 * Light theme configuration for the application, defining the primary colors
 * and other theme-specific properties. This theme is implemented as part of the
 * application's theming system and follows the `ThemeInterface`.
 *
 * @see ThemeInterface
 */
export const LightTheme: ThemeInterface = {
    /**
     * Primary color used across the app (e.g., buttons, highlights).
     * This is the dominant color for the light theme, typically a dark color for contrast.
     */
    primary: "#041259FF",

    /**
     * Secondary color used for text, icons, and other UI elements.
     * Typically white or light shades in light themes for contrast.
     */
    secondary: "#ffffff", // White for text and icons to stand out against darker backgrounds.

    /**
     * Darker shade for the app bar, providing a clear header or toolbar color.
     * This shade contrasts with the primary color to differentiate the app bar from content.
     */
    appbarDark: "#14181b", // Dark grey-blue for the app bar, maintaining contrast in a light theme.

    /**
     * Lighter shade for the app bar when switching to light elements on a light background.
     * Used for top-level elements where a lighter shade is needed to provide visual balance.
     */
    appbarLight: "#f1f1f1", // Light grey for the app bar background, providing a clean look.

    /**
     * Darker variation of the primary color, used for specific components
     * or areas where a more muted dark tone is necessary.
     */
    primaryDark: "#0e1218", // Deep dark grey-blue, useful for contrast and depth in UI elements.

    /**
     * Lighter variation of the primary color, useful for hovering effects
     * or light accents within the light theme.
     */
    primaryLight: "#e3e3e3", // Light grey for hover effects and accents, maintaining readability.

    /**
     * Color for hint text or placeholders (e.g., input fields or disabled text).
     * Typically a lighter, more subdued color to indicate secondary information.
     */
    hint: '#8B95A9', // Muted grey-blue for placeholder text, providing subtle visual guidance.

    /**
     * Color used for error messages, warning states, or validation errors.
     * Red is often chosen to quickly catch the user's attention.
     */
    error: '#E14747', // Bright red to signify errors or critical issues, ensuring visibility.

    /**
     * Color used for success messages or positive states (e.g., form submissions).
     * Green is commonly used to indicate success or "go" actions.
     */
    success: '#32A94C', // Bright green to indicate successful actions or positive feedback.

    /**
     * Color indicating pending actions or states waiting for confirmation.
     * Often a yellow or orange shade to indicate caution or ongoing processes.
     */
    pending: "#908319", // Muted yellow-gold to represent pending actions or processing states.
};