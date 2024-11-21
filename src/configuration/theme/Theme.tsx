import { Utility } from "../../utilities/Utility";
import { LightTheme } from "./LightTheme";

/**
 * Interface representing the structure of a theme.
 */
export interface ThemeInterface {
    /** Primary color */
    primary: string;
    /** Secondary color */
    secondary: string;
    /** Color of the app bar in Dark*/
    appbarDark: string;
    /** Color of the app bar in Light*/
    appbarLight: string;
    /** Dark shade of the primary color */
    primaryDark: string;
    /** Light shade of the primary color */
    primaryLight: string;
    /** Color for hints or placeholders */
    hint: string;
    /** Color used to indicate errors */
    error: string;
    /** Color used to indicate success */
    success: string;
    /** Color used to indicate pending state */
    pending: string;
}

/**
 * Base class for managing themes.
 * Allows dynamic switching and overriding of theme values.
 */
export class ThemeInstance {
    private currentTheme: ThemeInterface = LightTheme;

    /**
     * Sets the current theme.
     * @param theme - The theme to set (should adhere to ThemeInterface).
     */
    setTheme(theme: ThemeInterface) {
        this.currentTheme = theme;
    }

    /**
     * Retrieves the primary color for the current theme.
     * @returns {string} The primary color.
     */
    get primary(): string {
        return this.currentTheme.primary;
    }

    /**
     * Retrieves the secondary color for the current theme.
     * @returns {string} The secondary color.
     */
    get secondary(): string {
        return this.currentTheme.secondary;
    }

    /**
     * Retrieves the dark color of the app bar for the current theme.
     * @returns {string} The dark app bar color.
     */
    get appbarDark(): string {
        return this.currentTheme.appbarDark;
    }

    /**
     * Retrieves the light color of the app bar for the current theme.
     * @returns {string} The light app bar color.
     */
    get appbarLight(): string {
        return this.currentTheme.appbarLight;
    }

    /**
     * Retrieves the light shade of the primary color for the current theme.
     * @returns {string} The light shade of the primary color.
     */
    get primaryLight(): string {
        return this.currentTheme.primaryLight;
    }

    /**
     * Retrieves the dark shade of the primary color for the current theme.
     * @returns {string} The dark shade of the primary color.
     */
    get primaryDark(): string {
        return this.currentTheme.primaryDark;
    }

    /**
     * Retrieves the color used for hints or placeholders for the current theme.
     * @returns {string} The hint color.
     */
    get hint(): string {
        return this.currentTheme.hint;
    }

    /**
     * Retrieves the color used to indicate error states for the current theme.
     * @returns {string} The error color.
     */
    get error(): string {
        return this.currentTheme.error;
    }

    /**
     * Retrieves the color used to indicate success states for the current theme.
     * @returns {string} The success color.
     */
    get success(): string {
        return this.currentTheme.success;
    }

    /**
     * Retrieves the color used to indicate pending states for the current theme.
     * @returns {string} The pending color.
     */
    get pending(): string {
        return this.currentTheme.pending;
    }

    /**
     * Hover color.
     * @see LightTheme#secondary
     * @see DarkTheme#appbarDark
     */
    get hover() {
        return Utility.lightenColor(LightTheme.primaryLight, 8);
    }
}

export const Theme = new ThemeInstance();