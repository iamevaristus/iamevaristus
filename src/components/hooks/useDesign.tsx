import { useWebUiKit } from '../WebUikit';
import { useHeight } from './useHeight';
import { useWidth } from './useWidth';

interface DesignProperties {
    noMobilePadding: string;
    generalPadding: string;
    imageBackgroundPadding: string;
    imageBackgroundHeight: number;
    imageRadius: React.CSSProperties;
    isDesktop: boolean;
    isMobile: boolean;
    isTablet: boolean;
    width: number;
    height: number;
}

/**
 * Custom hook to calculate and return design-related properties based on the screen width.
 *
 * @returns {DesignProperties} An `DesignProperties` containing various design-related properties:
 * - `noMobilePadding`: Padding for non-mobile devices
 * - `generalPadding`: General padding based on device type
 * - `imageBackgroundPadding`: Padding for background images based on device type
 * - `imageBackgroundHeight`: Height of the background image based on device type
 * - `imageRadius`: Border radius for images
 * - `width`: Current width of the device
 * - `height`: Current height of the device
 */
export const useDesign = (): DesignProperties => {
    // Retrieve the current screen width using the custom `useWidth` hook
    const width = useWidth();

    // Retrieve the current screen height using the custom `useHeight` hook
    const height = useHeight();

    const { screenOrientation } = useWebUiKit();

    // Determine if the current width corresponds to a mobile device
    const isMobile = width <= screenOrientation.mobile;

    // Determine if the current width corresponds to a tablet device
    const isTablet = width >= screenOrientation.tablet;

    // Determine if the current width corresponds to a desktop device
    const isDesktop = width >= screenOrientation.desktop;

    // Calculate padding for elements that should have different padding on mobile vs. non-mobile devices
    const noMobilePadding = isMobile
        ? "" // No padding on mobile devices
        : isDesktop
        ? `56px ${width <= 1110 ? '100px' : '140px'}` // Specific padding for desktop devices
        : `56px 86px`; // Default padding for other devices

    // General padding for containers, varying based on device type
    const generalPadding = isMobile
        ? "120px 28px" // Padding for mobile devices
        : isDesktop
        ? `120px ${width <= 1110 ? '70px' : '80px'}` // Padding for desktop devices
        : "120px 56px"; // Default padding for other devices

    // Padding for background images, customized based on device type
    const imageBackgroundPadding = isMobile
        ? "200px 24px 96px 48px" // Padding for mobile devices
        : isDesktop
        ? "800px 24px 96px 48px" // Padding for desktop devices
        : "600px 24px 96px 48px"; // Default padding for other devices

    // Height of the background image, tailored to different devices
    const imageBackgroundHeight = isMobile
        ? 350 // Height for mobile devices
        : isDesktop
        ? 1000 // Height for desktop devices
        : 700; // Default height for other devices

    // Styling for image border radius
    const imageRadius: React.CSSProperties = {
        borderRadius: "24px" // Uniform border radius for images
    }

    // Return the design properties as an object
    return {
        noMobilePadding,
        generalPadding,
        imageBackgroundPadding,
        imageBackgroundHeight,
        imageRadius,
        isDesktop,
        isMobile,
        isTablet,
        width,
        height
    };
}