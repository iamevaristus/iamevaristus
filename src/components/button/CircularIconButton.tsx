import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";
import { IconButton, Tooltip } from "@mui/material";
import { Theme } from "../../configuration/theme/Theme";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface CircularIconButtonProps {
    /** in em */
    size?: number;
    color?: string;
    icon: IconDefinition | string | '';
    backgroundColor?: string;
    loading?: boolean;
    title?: string;
    isAwesome?: boolean;
    onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
    buttonStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
}

export const CircularIconButton: React.FC<CircularIconButtonProps> = ({
    size = 0.7,
    color = '',
    title = 'Click me',
    backgroundColor = "",
    icon = "solar:copy-line-duotone",
    loading = false,
    onClick = () => { },
    isAwesome = false,
    buttonStyle,
    iconStyle
}) => {
    const iconColor = color ? color : Theme.primary
    const bgColor = backgroundColor ? backgroundColor : Theme.secondary
    const btnStyle = { backgroundColor: bgColor, padding: "6px", ...buttonStyle };

    const iconToDisplay = loading ? "svg-spinners:90-ring-with-bg" : icon;

    const renderIcon = () => {
        if (isAwesome && icon) {
            if(loading) {
                return (
                    <Icon
                        icon="svg-spinners:90-ring-with-bg"
                        width={`${size}em`}
                        height={`${size}em`}
                        style={{ color: iconColor, ...iconStyle }}
                    />
                );
            } else {
                return (
                    <FontAwesomeIcon
                        icon={icon as IconDefinition}
                        style={{ color: iconColor, width: `${size}em`, height: `${size}em`, ...iconStyle }}
                    />
                );
            }
        } else {
            // Check if the icon is a valid string or IconDefinition
            return (
                <Icon
                    icon={iconToDisplay as string}
                    width={`${size}em`}
                    height={`${size}em`}
                    style={{ color: iconColor, ...iconStyle }}
                />
            );
        }
    };

    return (
        <Tooltip title={title}>
            <IconButton style={btnStyle} onClick={onClick}>
                {renderIcon()}
            </IconButton>
        </Tooltip>
    );
}