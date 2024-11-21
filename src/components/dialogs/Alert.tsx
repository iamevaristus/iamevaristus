import { Icon } from "@iconify/react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";

interface AlertProps {
    isOpen?: boolean;
    agreeText?: string;
    disagreeText?: string;
    title?: string;
    description?: string;
    handleClose?: () => void;
    onAgree?: () => void;
    onDisagree?: () => void;
    isAgreeing?: boolean;
    primaryColor?: string;
    backgroundColor?: string;
    hintColor?: string;
    disagreeColor?: string;
    agreeColor?: string;
}

export const Alert: React.FC<AlertProps> = ({
    isOpen = false,
    agreeText = '',
    disagreeText = '',
    title = '',
    description = '',
    handleClose = () => { },
    onAgree = () => { },
    onDisagree = () => { },
    isAgreeing = false,
    backgroundColor = Theme.appbarDark,
    primaryColor = Theme.primary,
    hintColor = Theme.hint,
    disagreeColor,
    agreeColor
}) => {
    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ [`& .MuiDialog-paper`]: { backgroundColor: backgroundColor } }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: "16px", color: primaryColor }}>
                    {title}
                </DialogTitle>
                {description && (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ fontSize: "14px", color: hintColor }}>
                            {description}
                        </DialogContentText>
                    </DialogContent>
                )}
                <DialogActions>
                    {disagreeText && (
                        <Button sx={{ color: disagreeColor ?? primaryColor }} onClick={() => { onDisagree(); handleClose(); }}>
                            {disagreeText}
                        </Button>
                    )}
                    {agreeText && (
                        <Button sx={{ color: agreeColor ?? primaryColor }} onClick={onAgree} autoFocus>
                            {isAgreeing ? (
                                <Icon
                                    icon="svg-spinners:90-ring-with-bg"
                                    width="1.2em"
                                    height="1.2em"
                                    style={{ color: agreeColor ?? primaryColor }}
                                />
                            ) : (
                                agreeText
                            )}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}