import { useEffect, useRef, useState } from "react";
import { Theme } from "../../configuration/theme/Theme";

/**
 * Props for the StepText component.
 *
 * @property {string} title - The text to be displayed within the step.
 * @property {boolean} [showBottom=true] - Whether to display the vertical line at the bottom of the step.
 * @property {number} [height] - Height of the vertical line at the bottom of the step if `showBottom` is true.
 * @property {string} [color] - Color for the text and vertical lines.
 * @property {string | number} [width='auto'] - Width of the step component.
 * @property {string} [stepColor] - Color for the vertical step line and indicator.
 * @property {string | number} [fontSize=14] - Font size for the title text.
 */
interface StepTextProps {
    title: string;
    showBottom?: boolean;
    height?: number;
    color?: string;
    width?: string | number;
    stepColor?: string;
    fontSize?: string | number;
}

/**
 * StepText component renders a step with a vertical line and a title.
 *
 * @param {StepTextProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 */
export const StepText: React.FC<StepTextProps> = ({
    title,
    showBottom = true,
    height,
    stepColor,
    color,
    width = 'auto',
    fontSize = 14
}) => {
    // State to store the calculated height of the step based on text height
    const [calculatedHeight, setCalculatedHeight] = useState(50);

    // Reference to the text element to measure its height
    const textRef = useRef<HTMLSpanElement>(null);

    // Effect to calculate and set the height based on the text element's height
    useEffect(() => {
        if (textRef.current) {
            // Get the height of the text element
            const { height } = textRef.current.getBoundingClientRect();
            // Set the calculated height, adding a bit of padding
            setCalculatedHeight(height + 10);
        }
    }, []);

    return (
        <div style={{ opacity: 1.0, width: typeof width === 'number' ? `${width}px` : width }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ height: '15px', width: '1.5px', backgroundColor: stepColor ?? color ?? Theme.primary }} />
                    <div
                        style={{
                            padding: '4px',
                            backgroundColor: stepColor ?? color ?? Theme.primary,
                            borderRadius: '1px',
                        }}
                    />
                    {showBottom && (
                        <div
                            style={{
                                height: `${height || calculatedHeight}px`,
                                width: '1.5px',
                                backgroundColor: stepColor ?? color ?? Theme.primary,
                            }}
                        />
                    )}
                </div>
                <div style={{ width: '10px' }} />
                <div style={{ flex: 1, padding: '10px' }}>
                    <span
                        ref={textRef}
                        style={{
                            color: color ?? Theme.primary,
                            fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
                            overflow: 'hidden',
                            textOverflow: 'clip',
                            display: 'inline-block',
                        }}
                    >
                        {title}
                    </span>
                </div>
            </div>
        </div>
    );
};