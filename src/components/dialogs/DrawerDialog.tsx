import { Drawer } from '@mui/material';
import * as React from 'react';
import { Theme } from '../../configuration/theme/Theme';

interface DrawerDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    position: "bottom" | "left" | "top" | "right" | undefined;
    children?: React.ReactNode;
    bgColor?: string;
    width?: string | number;
    paperStyle?: React.CSSProperties
}

export const DrawerDialog: React.FC<DrawerDialogProps> = ({
    isOpen = false,
    handleClose,
    position = 'bottom',
    children,
    bgColor,
    width,
    paperStyle
}) => {
    return (
        <Drawer
            anchor={ position }
            open={ isOpen }
            onClose={handleClose}
            sx={{
                [`& .MuiDrawer-paper`]: {
                    backgroundColor: bgColor || Theme.appbarDark,
                    width: width ? width : "auto",
                    ...paperStyle
                }
            }}>
            { children }
        </Drawer>
    )
}