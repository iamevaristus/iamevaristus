import React, { useEffect, useRef, useState } from 'react';
import { Theme } from '../../configuration/theme/Theme';

/**
 * Props for the SimpleStep component.
 *
 * @property {React.ReactNode} content - The content to be displayed inside the step.
 * @property {boolean} [showBottom=true] - Whether to show the vertical line at the bottom of the step.
 * @property {number} [height] - The height of the vertical line at the bottom of the step (if `showBottom` is true).
 * @property {string} [color] - The color of the step's vertical line and background.
 * @property {string | number} [width='auto'] - The width of the step component.
 */
interface SimpleStepProps {
    content: React.ReactNode;
    showBottom?: boolean;
    height?: number;
    color?: string;
    width?: string | number;
}

/**
 * SimpleStep component renders a step with a vertical line and content.
 *
 * @param {SimpleStepProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 */
export const SimpleStep: React.FC<SimpleStepProps> = ({ content, showBottom = true, height, color, width = 'auto' }) => {
    // State to hold the calculated height of the content
    const [calculatedHeight, setCalculatedHeight] = useState(50);

    // Reference to the content div for measuring its height
    const contentRef = useRef<HTMLDivElement>(null);

    // Effect to calculate the height of the content after it mounts
    useEffect(() => {
        if (contentRef.current) {
            // Get the height of the content element
            const { height } = contentRef.current.getBoundingClientRect();
            setCalculatedHeight(height); // Update the state with the content's height
        }
    }, []);

    return (
        <div style={{ opacity: 1.0, width: typeof width === 'number' ? `${width}px` : width }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ height: '15px', width: '1.5px', backgroundColor: color ?? Theme.primary }} />
                    <div
                        style={{
                            padding: '4px',
                            backgroundColor: color ?? Theme.primary,
                            borderRadius: '1px',
                        }}
                    />
                    {showBottom && (
                        <div
                            style={{
                                height: `${height || calculatedHeight}px`,
                                width: '1.5px',
                                backgroundColor: color ?? Theme.primary,
                            }}
                        />
                    )}
                </div>
                <div style={{ width: '10px' }} />
                <div style={{ flex: 1, paddingTop: '10px' }} ref={contentRef}>
                    {content}
                </div>
            </div>
        </div>
    );
};