import { Icon } from "@iconify/react";
import { Button, IconButton, Snackbar, Tooltip } from "@mui/material";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";
import { Utility } from "../utilities/Utility";

interface CopyButtonProps {
    size?: number;
    color?: string;
    data: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ size = 0.7, color, data }) => {
    const backgroundColor = color ? Utility.lightenColor(color, 45) : Utility.lightenColor(Theme.appbarLight, 45)
    const iconColor = color ? color : Theme.primary

    const buttonStyle = { backgroundColor: backgroundColor, padding: "6px" };

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Copied to clipboard")

    const handleClick = (message: string) => {
        setOpen(true);
        setMessage(message)
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(data)
            .then(() => handleClick("Copied to clipboard"))
            .catch(err => handleClick("Failed to copy to clipboard"));
    };

    const action = (
        <React.Fragment>
            <Button size="small" onClick={handleClose} sx={{
                [`&.MuiButton-root`]: {
                    textTransform: "none",
                    color: Theme.error
                }
            }}>Close</Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <Icon icon="lets-icons:close-round" width="1.2em" height="1.2em" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Tooltip title="Copy">
                <IconButton style={buttonStyle} onClick={handleCopyClick}>
                    <Icon icon="solar:copy-line-duotone" width={`${size}em`} height={`${size}em`} style={{ color: iconColor }} />
                </IconButton>
            </Tooltip>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
                sx={{
                    backgroundColor: backgroundColor ?? Theme.appbarLight
                }}
            />
        </div>
    );
}