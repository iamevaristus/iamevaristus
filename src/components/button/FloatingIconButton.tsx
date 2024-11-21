import { Icon } from "@iconify/react";
import { Fab, Tooltip } from "@mui/material";
import { Theme } from "../../configuration/theme/Theme";

interface FloatingIconButtonProps {
    title?: string;
    icon?: string;
    link?: string;
    option?: 'circular' | 'extended';
    size?: 'small' | 'medium' | 'large';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FloatingIconButton: React.FC<FloatingIconButtonProps> = ({
    title = 'Click me',
    icon = 'solar:widget-add-bold-duotone',
    link = '',
    option = 'circular',
    size = 'medium',
    onClick
}) => {
    return (
        <div style={{ right: "20px", bottom: "20px", position: "fixed" }}>
            <Tooltip title={title}>
                <Fab
                    aria-label="add"
                    href={link}
                    variant={option}
                    size={size}
                    sx={{
                        backgroundColor: Theme.appbarLight,
                        [`&.MuiFab-root:hover`]: { backgroundColor: Theme.hint }
                    }}
                    onClick={onClick}
                >
                    <Icon icon={icon} width="1.8em" height="1.8em" style={{ color: Theme.primary }} />
                </Fab>
            </Tooltip>
        </div>
    );
}