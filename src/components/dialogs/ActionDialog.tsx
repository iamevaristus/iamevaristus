import { Backdrop, Modal } from "@mui/material";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";
import { CircularIconButton } from "../button/CircularIconButton";
import { Utility } from "../utilities/Utility";

const styles = {
    body: {
        gap: '12px',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        display: 'flex',
        padding: '16px',
        position: 'absolute',
        alignItems: 'flex-start',
        flexDirection: 'column',
        overflow: 'auto',
    } as React.CSSProperties,
    header: {
        gap: '12px',
        flex: '0 0 auto',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: "12px"
    } as React.CSSProperties,

    headerContent: {
        flex: '1',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
    } as React.CSSProperties,
};

interface ActionDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    header?: string;
    description?: string;
    children?: React.ReactNode;
    height?: number | string;
    width?: number | string;
    radius?: number;
    bgColor?: string;
    color?: string;
    fontSize?: number;
    iconColor?: string;
    iconBackgroundColor?: string;
    mainStyles?: React.CSSProperties;
    headerBodyStyles?: React.CSSProperties;
    headerContentStyles?: React.CSSProperties;
}

export const ActionDialog = ({
    isOpen = false,
    handleClose,
    header = 'Add header',
    children,
    height = 450,
    width = 500,
    radius = 20,
    description,
    bgColor,
    color,
    fontSize = 16,
    iconColor,
    iconBackgroundColor,
    mainStyles,
    headerBodyStyles,
    headerContentStyles
}: ActionDialogProps): JSX.Element => {
    const descriptionFontSize = fontSize - 6;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <div style={{
                ...styles.body,
                backgroundColor: `${ bgColor ?? Theme.appbarDark }`,
                height: typeof height === 'string' ? height : `${ height }px`,
                width: typeof width === 'string' ? width : `${ width }px`,
                borderRadius: `${ radius }px`,
                ...mainStyles,
            }}>
                <div style={{...styles.header, ...headerBodyStyles}} >
                    <div style={{...styles.headerContent, ...headerContentStyles}}>
                        <span style={{ color: color ?? Theme.primary, fontSize: `${ fontSize }px` }}>{ header }</span>
                    </div>
                    <CircularIconButton
                        icon="lets-icons:close-round"
                        size={1}
                        backgroundColor={iconBackgroundColor ?? Utility.lightenColor(Theme.primary, 45)}
                        color={iconColor ?? Theme.primary}
                        title='Close'
                        onClick={handleClose}
                    />
                </div>
                { description && <span style={{ color: color ?? Theme.primary, fontSize: descriptionFontSize }}>{ description }</span> }
                { children }
            </div>
        </Modal>
    )
}