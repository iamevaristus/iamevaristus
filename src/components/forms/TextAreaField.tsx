import { CSSProperties, FC, useEffect, useState } from "react";
import { Theme } from "../../configuration/theme/Theme";
import { Utility } from "../../utilities/Utility";

/**
 * Interface defining the props for the TextAreaField component.
 */
interface TextAreaFieldProps {
    /** Determines if the label should be displayed */
    needLabel?: boolean;

    /** Placeholder text for the textarea */
    placeHolder?: string;

    /** Type of the textarea, usually left as default */
    type?: string;

    /** Autocomplete attribute for the textarea */
    autoComplete?: string;

    /** Text to display as a label */
    label?: string;

    /** Determines if spacing below the component is needed */
    needSpacer?: boolean;

    /** Disables the textarea if true */
    isDisabled?: boolean;

    /** Makes the textarea required if true */
    isRequired?: boolean;

    /** Initial value of the textarea */
    value?: string;

    /** Color for the text inside the textarea */
    color?: string;

    /** Border color of the textarea */
    borderColor?: string;

    /** Border radius of the textarea */
    borderRadius?: number;

    /** Determines if the border should be shown */
    showBorder?: boolean;

    /** Background color of the textarea */
    backgroundColor?: string;

    /** Click handler for the textarea */
    onClick?: () => void;

    /** Key down event handler for the textarea */
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;

    /** Change handler for the textarea value */
    onChange?: (value: string) => void;

    /** Change handler for the textarea value */
    onChangeEvent?: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;

    /** Number of rows in the textarea */
    rows?: number | undefined;

    /** Font size for the input text */
    fontSize?: number;

    /** The CSS style for the parent element of Field */
    parentStyle?: React.CSSProperties;

    /** The CSS style for the input element */
    inputStyle?: React.CSSProperties;

    /** The CSS Style for the input when it is on focus */
    inputFocusStyle?: React.CSSProperties;

    labelColor?: string;

    labelStyle?: React.CSSProperties
}

/**
 * Functional component for rendering a customizable textarea field with optional label and styles.
 *
 * This component allows users to enter multi-line text, provides various customization options,
 * and handles value changes, focus, and blur events.
 */
export const TextAreaField: FC<TextAreaFieldProps> = ({
    needLabel = true,
    placeHolder = '',
    autoComplete = "",
    label = "",
    needSpacer = true,
    isDisabled = false,
    isRequired = true,
    value = '',
    onClick,
    color = Theme.primary,
    backgroundColor = 'inherit',
    borderRadius = 18,
    borderColor = Theme.hint,
    showBorder = true,
    onKeyDown,
    onChange = () => {},
    rows = 10,
    fontSize = 14,
    parentStyle,
    inputStyle,
    inputFocusStyle,
    onChangeEvent = () => {},
    labelColor = Theme.primary,
    labelStyle
}) => {
    // State to manage the current value of the textarea
    const [inputValue, setInputValue] = useState<string>(value);

    // Effect to update textarea value when the prop `value` changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    /**
     * Handles the change event of the textarea.
     *
     * Updates the local state and triggers the onChange callback with the new value.
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);

        onChange(e.target.value);
        onChangeEvent(e)
    };

    /**
     * Styles for the textarea input field.
     */
    const iStyle: CSSProperties = {
        color: color,
        width: '100%',
        height: 'auto',
        transition: '0.3s',
        paddingTop: '10px',
        borderColor: showBorder ? borderColor : "transparent",
        borderWidth: '1px',
        borderRadius: `${borderRadius}px`,
        paddingLeft: '12px',
        outline: 'none',
        paddingRight: '12px',
        paddingBottom: '10px',
        backgroundColor: backgroundColor,
        cursor: onClick ? 'pointer' : 'auto',
        fontSize: fontSize,
        resize: 'vertical',  // Allow vertical resizing of the textarea,
        ...inputStyle
    };

    /**
     * Styles for the textarea input field when focused.
     */
    const iFocusStyle: CSSProperties = {
        borderColor: Utility.lightenColor(color, 40),
        borderWidth: '2px',
        ...inputFocusStyle
    };

    return (
        <div
            style={{
                flex: '0 0 auto',
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: needSpacer ? '20px' : "0",
                flexDirection: 'column',
                ...parentStyle
            }}
            onClick={onClick}
        >
            {(needLabel && label !== '') && (
                <label
                    style={{
                        color: labelColor,
                        marginBottom: '8px',
                        width: '100%',
                        ...labelStyle
                    }}
                >
                    {label}
                </label>
            )}
            <textarea
                required={isRequired}
                placeholder={placeHolder}
                autoComplete={autoComplete}
                style={iStyle}
                disabled={isDisabled}
                readOnly={!!onClick}
                onKeyDown={onKeyDown}
                value={inputValue}
                onChange={handleChange}
                onFocus={(e) => Object.assign(e.target.style, iFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, iStyle)}
                rows={rows}
            />
        </div>
    );
}