import React, { useState, useRef, useEffect } from "react";

/**
 * Props for the Step component.
 *
 * @property {React.ReactNode} content - The main content to be displayed within the step.
 * @property {React.ReactNode} [prefix] - Optional prefix element displayed before the main step content.
 * @property {boolean} [showBottom=true] - Whether to display the vertical line at the bottom of the step.
 * @property {number} [height] - Height of the vertical line at the bottom of the step if `showBottom` is true.
 * @property {string} [color] - Color for the vertical lines and step indicator.
 * @property {string | number} [width='auto'] - Width of the step component.
 * @property {number} [indicatorSize=4] - Size of the step indicator (circle) in pixels.
 */
interface StepProps {
    content: React.ReactNode;
    prefix?: React.ReactNode;
    showBottom?: boolean;
    height?: number;
    color?: string;
    width?: string | number;
    indicatorSize?: number;
}

/**
 * Step component renders a step with a vertical line, optional prefix, and content.
 *
 * @param {StepProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 */
export const Step: React.FC<StepProps> = ({
    content,
    prefix,
    showBottom = true,
    height,
    color,
    width = 'auto',
    indicatorSize = 4,
}) => {
    // State to store the calculated height of the step
    const [calculatedHeight, setCalculatedHeight] = useState(50);

    // References to measure the height of content and prefix elements
    const contentRef = useRef<HTMLDivElement>(null);
    const prefixRef = useRef<HTMLDivElement>(null);

    // Effect to calculate and set the height based on content and prefix
    useEffect(() => {
        if (contentRef.current && prefixRef.current) {
            const contentHeight = contentRef.current.getBoundingClientRect().height;
            const prefixHeight = prefixRef.current.getBoundingClientRect().height;

            // Set the height to the greater of contentHeight or prefixHeight
            setCalculatedHeight(Math.max(contentHeight, prefixHeight));
        } else if (contentRef.current) {
            const { height } = contentRef.current.getBoundingClientRect();

            // If there is a prefix, use a minimum height of 300 or the content height
            if (prefix) {
                setCalculatedHeight(Math.max(height, 300));
            } else {
                setCalculatedHeight(height);
            }
        } else if (prefixRef.current) {
            const { height } = prefixRef.current.getBoundingClientRect();
            setCalculatedHeight(height); // Set the height based on the prefix
        }
    }, [contentRef, prefixRef, prefix]);

    // Styling constants
    const lineWidth = '1.5px'; // Width of the vertical line
    const paddingTop = indicatorSize + 4; // Top padding for content and prefix
    const spacing = indicatorSize + 6; // Spacing between the prefix and the vertical line

    return (
        <div style={{ opacity: 1.0, width: typeof width === 'number' ? `${width}px` : width }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {prefix && (
                    <React.Fragment>
                        <div style={{ paddingTop: paddingTop }} ref={prefixRef}>
                            {prefix}
                        </div>
                        <div style={{ width: `${spacing}px` }} />
                    </React.Fragment>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ height: "15px", width: lineWidth, backgroundColor: color ?? 'primary' }} />
                    <div style={{ padding: `${indicatorSize}px`, backgroundColor: color ?? 'primary', borderRadius: '1px' }} />
                    {showBottom && (
                        <div style={{ height: `${height || calculatedHeight}px`, width: lineWidth, backgroundColor: color ?? 'primary' }} />
                    )}
                </div>
                <div style={{ width: `${spacing}px` }} />
                <div style={{ flex: 1, paddingTop: paddingTop }} ref={contentRef}>
                    {content}
                </div>
            </div>
        </div>
    );
};