import styled from "@emotion/styled";
import { Switch } from "@mui/material";
import { ChangeEvent } from "react";
import { Theme } from "../../configuration/theme/Theme";

/**
 * Interface representing the properties for the custom switch component.
 */
interface SwitchProps {
    /** Color of the track when the switch is checked. */
    checkedTrackColor?: string;
    /** Background color of the track. */
    trackBackgroundColor?: string;
    /** Transition duration for state changes. */
    transition?: string;
    /** Transform value for the checked state thumb. */
    transform?: "none" | string;
    /** Color of the thumb when the switch is checked. */
    checkedColor?: string;
    /** Color of the thumb when the switch is not checked. */
    unCheckedColor?: string;
    /** Opacity of the track when the switch is checked. */
    checkedTrackOpacity?: string | number;
    /** Border of the track when the switch is checked. */
    checkedTrackBorder?: string | number;
    /** Opacity of the track when the switch is checked and disabled. */
    checkedDisabledTrackOpacity?: string | number;
    /** Color of the thumb when the switch is checked. */
    thumbCheckColor?: string;
    /** Border for the thumb when the switch is checked. */
    thumbCheckBorder?: string;
    /** Color of the thumb when the switch is disabled. */
    thumbDisabledColor?: string;
    /** Opacity of the track when the switch is disabled. */
    trackDisabledOpacity?: string | number;
    /** Box sizing model for the thumb. */
    thumbBoxSizing?: "content-box" | "border-box";
    /** Width of the thumb. */
    thumbWidth?: "auto" | string | "min-content" | "max-content" | "fit-content" | number;
    /** Height of the thumb. */
    thumbHeight?: "auto" | string | "min-content" | "max-content" | "fit-content" | number;
    /** Margin around the thumb. */
    thumbMargin?: string | number;
    /** Border radius of the track. */
    trackBorderRadius?: string | number;
    /** Opacity of the track. */
    trackOpacity?: string | number;
    /** Transition for the track. */
    trackTransition?: string;
    /** Padding for the switch. */
    basePadding?: number;
    /** Border radius of the base switch component. */
    baseBorderRadius?: string | number;
    /** Width of the base switch component. */
    baseWidth?: "auto" | string | "min-content" | "max-content" | "fit-content" | number;
    /** Height of the base switch component. */
    baseHeight?: "auto" | string | "min-content" | "max-content" | "fit-content" | number;
}

/**
 * Styled component for a custom switch that uses Material-UI's Switch component as a base.
 */
const CustomSwitchWrapper = styled(Switch)<SwitchProps>(({
    checkedTrackColor,
    trackBackgroundColor,
    transition = '300ms',
    basePadding = 0,
    baseBorderRadius = 24,
    baseHeight = 30,
    baseWidth = 48,
    transform = 'translateX(16px)',
    checkedColor = "#fff",
    checkedTrackOpacity = 1,
    checkedTrackBorder = 0,
    checkedDisabledTrackOpacity = 0.5,
    thumbCheckColor = '#33cf4d',
    thumbCheckBorder = '6px solid #fff',
    thumbDisabledColor = Theme.hint,
    trackDisabledOpacity = 0.3,
    thumbBoxSizing = 'border-box',
    thumbWidth = 20,
    thumbHeight = 20,
    thumbMargin = 5,
    trackBorderRadius = 26 / 2,
    trackOpacity = 1,
    unCheckedColor = "#fff",
    trackTransition = 'background-color 300ms',
}) => ({
    width: baseWidth,
    height: baseHeight,
    borderRadius: baseBorderRadius,
    padding: basePadding,
    '& .MuiSwitch-switchBase': {
        padding: basePadding,
        transitionDuration: transition,
        color: unCheckedColor,
        '&.Mui-checked': {
            transform: transform,
            color: checkedColor,
            '& + .MuiSwitch-track': {
                backgroundColor: checkedTrackColor,
                opacity: checkedTrackOpacity,
                border: checkedTrackBorder,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: checkedDisabledTrackOpacity,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: thumbCheckColor,
            border: thumbCheckBorder,
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: thumbDisabledColor,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: trackDisabledOpacity,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: thumbBoxSizing,
        width: thumbWidth,
        height: thumbHeight,
        margin: thumbMargin,
    },
    '& .MuiSwitch-track': {
        borderRadius: trackBorderRadius,
        backgroundColor: trackBackgroundColor,
        opacity: trackOpacity,
        transition: trackTransition,
    },
}));

/**
 * Props for the Switcher component, extending SwitchProps with additional properties.
 */
interface SwitcherProps extends SwitchProps {
    /** Indicates if the switch is checked. */
    checked: boolean;
    /** Callback function to handle changes to the switch. */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /** Name of the switch input. */
    name?: string;
    /** Optional label displayed next to the switch. */
    label?: string;
    /** Indicates if the switch is disabled. */
    disabled?: boolean;
    /** CSS display property for the switch container. */
    display?: string;
    /** CSS alignment property for the switch container. */
    alignment?: string;
}

/**
 * Switcher component that utilizes the CustomSwitchWrapper to render a styled switch.
 *
 * @param {SwitcherProps} props - Properties for the Switcher component.
 * @returns {JSX.Element} The rendered Switcher component.
 */
export const Switcher: React.FC<SwitcherProps> = ({
    checked,
    onChange,
    name,
    label,
    disabled = false,
    checkedTrackColor = "#030001",
    trackBackgroundColor = '#f2f2f2',
    transition = '300ms',
    basePadding = 0,
    baseBorderRadius = 24,
    baseHeight = 30,
    baseWidth = 48,
    unCheckedColor = "#fff",
    transform = 'translateX(16px)',
    checkedColor = "#fff",
    checkedTrackOpacity = 1,
    checkedTrackBorder = 0,
    checkedDisabledTrackOpacity = 0.5,
    thumbCheckColor = '#33cf4d',
    thumbCheckBorder = '6px solid #fff',
    thumbDisabledColor = Theme.hint,
    trackDisabledOpacity = 0.3,
    thumbBoxSizing = 'border-box',
    thumbWidth = 20,
    thumbHeight = 20,
    thumbMargin = 5,
    trackBorderRadius = 26 / 2,
    trackOpacity = 1,
    trackTransition = 'background-color 300ms',
    display = "flex",
    alignment = "center"
}) => {
    return (
        <div style={{ display: display, alignItems: alignment }}>
            <CustomSwitchWrapper
                checked={checked}
                onChange={onChange}
                name={name}
                disabled={disabled}
                unCheckedColor={unCheckedColor}
                checkedTrackColor={checkedTrackColor}
                transition={transition}
                trackBackgroundColor={trackBackgroundColor}
                basePadding={basePadding}
                baseBorderRadius={baseBorderRadius}
                baseHeight={baseHeight}
                baseWidth={baseWidth}
                transform={transform}
                checkedColor={checkedColor}
                checkedTrackOpacity={checkedTrackOpacity}
                checkedTrackBorder={checkedTrackBorder}
                checkedDisabledTrackOpacity={checkedDisabledTrackOpacity}
                thumbCheckColor={thumbCheckColor}
                thumbCheckBorder={thumbCheckBorder}
                thumbDisabledColor={thumbDisabledColor}
                trackDisabledOpacity={trackDisabledOpacity}
                thumbBoxSizing={thumbBoxSizing}
                thumbWidth={thumbWidth}
                thumbHeight={thumbHeight}
                thumbMargin={thumbMargin}
                trackBorderRadius={trackBorderRadius}
                trackOpacity={trackOpacity}
                trackTransition={trackTransition}
            />
            {label && <label style={{ marginLeft: '8px' }}>{label}</label>}
        </div>
    );
};