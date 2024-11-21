import React, { CSSProperties, FC, KeyboardEventHandler, useEffect, useState } from 'react';
import { Theme } from '../../configuration/theme/Theme';

/**
 * Interface defining the props for the Field component.
 */
interface FieldProps {
    /** Whether to display a label for the field */
    needLabel?: boolean;

    /** Placeholder text for the input field */
    placeHolder?: string;

    /** Type of the input field (e.g., text, password) */
    type?: string;

    /** Autocomplete attribute for the input field */
    autoComplete?: string;

    /** Label text to display if needLabel is true */
    label?: string;

    /** Callback function to handle changes to the input value */
    onChange?: (text: string) => void;

    /** Whether to include bottom margin spacing */
    needSpacer?: boolean;

    /** Whether the input field is disabled */
    isDisabled?: boolean;

    /** Whether the input field is required */
    isRequired?: boolean;

    /** Controlled value of the input field */
    value?: string;

    /** Event handler for key down events */
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;

    /** Callback function to handle click events */
    onClick?: () => void;

    /** Text color for the input field */
    color?: string;

    /** Background color for the input field */
    backgroundColor?: string;

    /** Padding for the input field */
    padding?: string;

    /** Height of the input field */
    height?: number;

    /** Border color for the input field */
    borderColor?: string;

    /** Label color for the input field */
    labelColor?: string;

    /** Border radius for the input field */
    borderRadius?: number;

    /** Whether to display a border around the input field */
    showBorder?: boolean;

    /** Font size for the input text */
    fontSize?: number;

    /** The CSS style for the parent element of Field */
    parentStyle?: React.CSSProperties;

    /** The CSS style for the input element */
    inputStyle?: React.CSSProperties;

    /** The CSS Style for the input when it is on focus */
    inputFocusStyle?: React.CSSProperties;
}

/**
 * Functional component for rendering a customizable input field.
 *
 * This component supports various styles and behaviors including labels, padding, border, and more.
 */
export const Field: FC<FieldProps> = ({
    needLabel = true,
    placeHolder = '',
    type = 'text',
    autoComplete = "",
    label = "",
    needSpacer = true,
    isDisabled = false,
    isRequired = true,
    value = '',
    onClick,
    onKeyDown,
    onChange = () => {},
    color = Theme.primary,
    backgroundColor = 'inherit',
    padding = '10px 12px',
    height = 50,
    borderRadius = 18,
    borderColor = Theme.hint,
    showBorder = true,
    fontSize = 16,
    labelColor = Theme.primary,
    parentStyle,
    inputStyle,
    inputFocusStyle
}) => {
    // Local state to keep track of the input field value
    const [inputValue, setInputValue] = useState<string>(value);

    /**
     * Effect hook to update local input value when the prop value changes.
     */
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    /**
     * Handles changes in the input field and triggers the onChange callback.
     *
     * @param e The event object for the change event.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);  // Update local state with new value
        onChange(e.target.value);       // Call the onChange callback with the new value
    };

    /**
     * Style for the input field.
     */
    const iStyle: CSSProperties = {
        color: color,
        width: '100%',
        height: `${height}px`,
        transition: '0.3s',
        padding: padding,
        borderColor: showBorder ? borderColor : "transparent",
        borderWidth: '1px',
        borderRadius: `${borderRadius}px`,
        outlineStyle: 'none',
        backgroundColor: backgroundColor,
        cursor: onClick ? 'pointer' : 'auto',
        fontSize: `${fontSize}px`,
        ...inputStyle
    };

    /**
     * Style for input field when focused.
     */
    const iFocusStyle: CSSProperties = {
        borderColor: showBorder ? color : "transparent",
        borderWidth: '2px',
        ...inputFocusStyle
    };

    return (
        <div style={{
            flex: '0 0 auto',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: needSpacer ? '20px' : "0",
            flexDirection: 'column',
            ...parentStyle
        }} onClick={onClick}>
            {(needLabel && label !== '') && <label style={{
                fill: labelColor ?? Theme.primary,
                color: labelColor ?? Theme.primary,
                marginBottom: '8px',
                width: '100%',
                fontSize: `${fontSize}px`,
            }}>{label}</label>}
            <input
                type={type}
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
            />
        </div>
    );
}