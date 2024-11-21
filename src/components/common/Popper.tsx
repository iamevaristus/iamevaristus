import { Popover, PopoverOrigin } from "@mui/material";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";

interface PopperProps {
    isOpen: boolean;
    anchor: HTMLButtonElement | undefined;
    handleClose: () => void;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    style?: React.CSSProperties;
    paperStyle?: React.CSSProperties;
    rootStyle?: React.CSSProperties;
    backgroundColor?: string;
    top?: string;
    children?: React.ReactNode;
}

export const Popper: React.FC<PopperProps> = ({
    isOpen,
    anchor,
    handleClose,
    anchorOrigin,
    transformOrigin,
    style,
    paperStyle,
    rootStyle,
    backgroundColor,
    children,
    top = "16px"
}) => {
    return (
        <Popover
            id={isOpen ? 'simple-popover' : undefined}
            open={isOpen}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            slotProps={{
                paper: {
                    style: {
                        top: top,
                        ...paperStyle
                    }
                },
                root: {
                    style: {
                        ...rootStyle
                    }
                }
            }}
            sx={{
                [`& .MuiPopover-paper`]: {
                    backgroundColor: backgroundColor ?? Theme.primary,
                    width: "320px",
                    marginBottom: "20px",
                    ...style
                },
            }}
        >
            {children}
        </Popover>
    )
}