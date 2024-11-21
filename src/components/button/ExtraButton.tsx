import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";
import { Tip } from "../common/Tip";

interface ExtraButtonProps {
    /** Click event handler for the button */
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    /** Indicates if the button is in a loading/disabled state */
    state?: boolean;
    /** Icon name for the button's startIcon */
    icon?: string;
    /** Size of the icon in `em` */
    iconSize?: number;
    /** Text or number displayed as the button's title */
    title?: string | number;
    /** Background color of the button */
    backgroundColor?: string;
    /** Color of the button text and icon */
    color?: string;
    /** If true, the button will show as expanded */
    open?: boolean;
    /** Padding for the button content */
    padding?: string;
    /** Size of the button: small, medium, or large */
    size?: "small" | "medium" | "large";
    /** Optional link for the button */
    link?: string | undefined;
    /** Action text displayed when the button is in a loading state */
    actionText?: string;
    /** Font size of the button's text */
    fontSize?: string;
    /** Border radius of the button */
    borderRadius?: string;
    /** Hover background color for the button */
    hoverColor?: string;
    /** Additional CSS properties applied to the root element */
    rootStyle?: React.CSSProperties;
    /** Additional CSS properties applied to the icon element */
    iconStyle?: React.CSSProperties;
    /** Additional CSS properties applied to the hover state */
    hoverStyle?: React.CSSProperties;
    /** Additional CSS properties applied to the tip state */
    tipStyle?: React.CSSProperties;
    /** Tip text */
    tip?: string;
    /** Placement */
    placement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start"
}

/**
 * `ExtraButton` is a reusable button component that can display an icon, handle clicks,
 * and accept various styles for customization, including hover effects and icon size.
 *
 * @param {ExtraButtonProps} props - The props for the `ExtraButton` component.
 * @returns {JSX.Element} A styled MUI Button with an optional icon and various customization options.
 */
export const ExtraButton: React.FC<ExtraButtonProps> = ({
    onClick,
    state = false,
    open = false,
    size = "small",
    icon = '',
    title = "Click me",
    padding = "4px 12px",
    backgroundColor,
    color,
    iconSize = 1.5,
    link,
    actionText = 'Updating...',
    fontSize = "12px",
    borderRadius = "16px",
    rootStyle,
    iconStyle,
    hoverStyle,
    hoverColor,
    tip,
    tipStyle,
    placement
}: ExtraButtonProps): JSX.Element => {
    const child = (): JSX.Element => {
        return (
            <Button
                size={size}
                onClick={onClick}
                id="basic-button"
                href={link}
                disabled={state}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                startIcon={
                    icon && <Icon
                        icon={state ? "svg-spinners:90-ring-with-bg" : icon}
                        width={`${iconSize}em`}
                        height={`${iconSize}em`}
                        style={{ color: color ?? Theme.primary }}
                    />
                }
                sx={{
                    textTransform: "none",
                    color: color ?? Theme.primary,
                    fontSize: fontSize,
                    padding: padding,
                    borderRadius: borderRadius,
                    backgroundColor: backgroundColor,
                    ...rootStyle,
                    '&:hover': {
                        backgroundColor: hoverColor ? `${hoverColor}` : Theme.hint,
                        ...hoverStyle,
                    },
                    [`& .MuiButton-startIcon`]: {
                        marginRight: actionText && actionText !== "" ? "8px" : "0",
                        marginLeft: actionText && actionText !== "" ? "-2px" : "0",
                        ...iconStyle,
                    },
                }}
            >
                {state ? actionText : title}
            </Button>
        )
    }

    if(tip) {
        return (
            <Tip sx={{...tipStyle}} placement={placement} title={tip}>
                {child()}
            </Tip>
        )
    } else {
        return child()
    }
}