import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import React from 'react';
import { Theme } from "../../configuration/theme/Theme";
import { Utility } from "../../utilities/Utility";

interface ActionButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    state?: boolean;
    icon?: string;
    iconSize?: number;
    title?: string | number;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    color?: string;
    hoverColor?: string;
    open?: boolean;
    padding?: string;
    size?: "small" | "medium" | "large";
    link?: string | undefined;
    actionText?: string;
    borderRadius?: string;
    isFullWidth?: boolean;
    fontSize?: number;
    useLoader?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    onClick,
    state = false,
    open = false,
    size = "small",
    icon = '',
    title = "Click me",
    padding = "4px 12px",
    backgroundColor,
    hoverBackgroundColor,
    color,
    hoverColor,
    iconSize = 1.5,
    link,
    actionText = 'Updating...',
    borderRadius,
    isFullWidth = false,
    fontSize = 12,
    useLoader = false
}) => {
    const finalBackgroundColor = backgroundColor ?? 'transparent';
    const finalColor = color ?? Theme.primary;
    const computedHoverBackgroundColor = hoverBackgroundColor
        ? hoverBackgroundColor
        : finalBackgroundColor === 'transparent'
            ? Utility.lightenColor(finalColor, 50)
            : finalColor;
    const computedHoverColor = hoverColor ?? finalBackgroundColor;

    const [iconColor, setIconColor] = React.useState<string>(finalColor);

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
            onMouseEnter={() => setIconColor(computedHoverColor)}
            onMouseLeave={() => setIconColor(finalColor)}
            startIcon={
                (icon || (useLoader && state)) && <Icon
                    icon={state ? "svg-spinners:90-ring-with-bg" : icon}
                    width={`${iconSize}em`}
                    height={`${iconSize}em`}
                    style={{ color: iconColor, transition: 'color 0.3s' }}
                />
            }
            sx={{
                [`&.MuiButton-root`]: {
                    textTransform: "none",
                    color: finalColor,
                    fontSize: `${fontSize}px`,
                    padding: padding,
                    borderRadius: borderRadius ?? "16px",
                    backgroundColor: finalBackgroundColor,
                    width: isFullWidth ? "100%" : "auto",
                    transition: 'background-color 0.3s, color 0.3s',
                    '&:hover': {
                        backgroundColor: computedHoverBackgroundColor,
                        color: computedHoverColor,
                    },
                }
            }}
        >
            {useLoader && state ? "" : state ? actionText : title}
        </Button>
    );
}