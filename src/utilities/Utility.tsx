import { WebUiKitException } from "../components/exception/WebUiKitException";
import Upload from "../components/models/Upload";
import { useWebUiKit } from "../components/WebUikit";
import { Notify } from "./Notify";

/**
 * Utility class for various common web UI tasks, such as string formatting, color manipulation, and screen size detection.
 */
export class Utility {

    /**
     * Capitalize the first letter of a given string.
     * @param str - The string to capitalize.
     * @returns The input string with the first letter capitalized, or an empty string if input is falsy.
     */
    static capitalizeFirstLetter(str: string): string {
        if (!str) return ''; // Ensure falsy strings like null or undefined return empty.
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Formats a date string into a readable 'Month Day, Year' format (e.g., 'January 1, 2023').
     * @param dateString - The date string to format.
     * @returns A formatted date string based on the 'en-US' locale.
     */
    static formatDate(dateString: string): string {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });
        } catch (e) {
            throw new WebUiKitException("Unformatted date string")
        }
    }

    /**
     * Generate an array of integers from 1 to the specified length.
     * @param length - The number of items to generate. Defaults to 5.
     * @returns An array of numbers starting from 1 to the specified length.
     */
    static itemGenerate(length: number = 5): number[] {
        return Array.from({ length }, (_, index) => index + 1);
    }

    /**
     * Copy text to the user's clipboard and show a notification.
     * @param text - The text to copy to the clipboard.
     * @param message - Optional message to show upon success; defaults to "Copied".
     */
    static copy(text: string, message?: string): void {
        try {
            navigator.clipboard.writeText(text);
            Notify.info(message ?? "Copied");
        } catch (e) {
            Notify.error("Couldn't copy, try again");
        }
    }

    /**
     * Lighten a hexadecimal color by a certain percentage.
     * @param hex - The hex color code to lighten.
     * @param percent - The percentage by which to lighten the color.
     * @returns A lighter version of the input hex color as a string.
     */
    static lightenColor(hex: string, percent: number): string {
        const num = parseInt(hex.slice(1), 16); // Removes the '#' and converts hex to an integer.
        const amt = Math.round(2.55 * percent); // Calculate how much to lighten by.
        const R = ((num >> 16) & 0xFF) + amt; // Extract and adjust the red channel.
        const G = ((num >> 8) & 0xFF) + amt; // Extract and adjust the green channel.
        const B = (num & 0xFF) + amt; // Extract and adjust the blue channel.

        // Ensure the RGB values remain within the 0-255 range and convert back to hex.
        return `#${(
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
            .toString(16)
            .slice(1)
            .toUpperCase()}`;
    }

    /**
     * Generate a random hexadecimal color code.
     * @returns A random hex color string.
     */
    static getRandomColor(): string {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generates a random hex color.
    }

    /**
     * Generate an array of random hexadecimal color codes.
     * @param numColors - The number of random colors to generate.
     * @returns An array of random hex color strings.
     */
    static generateRandomColors(numColors: number): string[] {
        const colors: string[] = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(Utility.getRandomColor()); // Calls the internal getRandomColor method.
        }
        return colors;
    }

    /** Default image URL to be used if no image is provided. */
    static DEFAULT_IMAGE = "https://play.teleporthq.io/static/svg/default-img.svg";

    /**
     * Check if the screen width corresponds to a desktop view.
     * @param width - The current screen width.
     * @returns True if the width is equal to or greater than the desktop breakpoint.
     */
    static isDesktop(width: number): boolean {
        const { screenOrientation } = useWebUiKit();
        return width >= screenOrientation.desktop;
    }

    /**
     * Check if the screen width corresponds to a tablet view.
     * @param width - The current screen width.
     * @returns True if the width is equal to or greater than the tablet breakpoint.
     */
    static isTablet(width: number): boolean {
        const { screenOrientation } = useWebUiKit();
        return width >= screenOrientation.tablet;
    }

    /**
     * Check if the screen width corresponds to a mobile view.
     * @param width - The current screen width.
     * @returns True if the width is equal to or greater than the mobile breakpoint.
     */
    static isMobile(width: number): boolean {
        const { screenOrientation } = useWebUiKit();
        return width <= screenOrientation.mobile;
    }

    /**
     * Static method to convert an image file into a `Upload` object.
     * This method reads the file as an ArrayBuffer, converts it into a Uint8Array,
     * and wraps it into a `Upload` object.
     *
     * @param {File} file - The file to be uploaded, should be an image file (e.g., PNG, JPEG).
     * @returns {Promise<Upload | undefined>} A promise that resolves to a `Upload`
     *                                                   or rejects with an error if the file is invalid.
     * @throws {WebUiKitException} If the file is not an image or fails to be read.
     *
     * @example
     * const fileUpload = await YourClass.getUpload(file);
     * if (fileUpload) {
     *    console.log(fileUpload);
     * }
     */
    static getUpload = async (file: File): Promise<Upload | undefined> => {
        return new Promise((resolve, reject) => {
            // Check if the file is an image
            if (!file.type.startsWith('image/')) {
                reject(new WebUiKitException('Only image files are allowed'));
                return;
            }

            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                const fileData = event.target?.result;
                if (fileData) {
                    resolve(new Upload({
                        path: file.name, // File name as path
                        media: file.type, // Media type (e.g., image/png, image/jpeg)
                        bytes: new Uint8Array(fileData as ArrayBuffer), // Convert ArrayBuffer to Uint8Array
                    }));
                } else {
                    reject(new WebUiKitException('Failed to read the file'));
                }
            };

            fileReader.onerror = () => {
                reject(new WebUiKitException('Failed to read the file'));
            };

            fileReader.readAsArrayBuffer(file);
        });
    };
}