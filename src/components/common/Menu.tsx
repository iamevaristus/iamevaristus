import styled from "@emotion/styled";
import { Menu, MenuItem } from "@mui/material";
import { Theme } from "../../configuration/theme/Theme";

interface StyledMenuProps {
    children: React.ReactNode;
    id?: string;
    onClose?: () => void;
    anchorEl?: HTMLElement | null;
    isOpen?: boolean;
    backgroundColor?: string;
    color?: string;
}

/**
 * StyledMenu is a customizable menu component that utilizes Material-UI's Menu component.
 * It allows for setting specific background and text colors while maintaining MUI's functionality.
 *
 * @component
 *
 * @param {Object} props - The properties for the StyledMenu component.
 * @param {React.ReactNode} props.children - The menu items or any other React nodes to render inside the menu.
 * @param {string} [props.id] - An optional ID for the menu, which can be used for accessibility.
 * @param {function} [props.onClose] - An optional callback function to be called when the menu is closed.
 * @param {HTMLElement|null} [props.anchorEl] - The element to which the menu is anchored; if null, the menu will be positioned relative to the screen.
 * @param {boolean} [props.isOpen=false] - A boolean indicating whether the menu is open or closed.
 * @param {string} [props.backgroundColor=Theme.appbarDark] - The background color of the menu.
 * @param {string} [props.color=Theme.secondary] - The text color of the menu items.
 *
 * @returns {JSX.Element} A JSX element that represents a styled Material-UI Menu.
 *
 * @example
 * <StyledMenu
 *     anchorEl={anchorElement}
 *     isOpen={isOpen}
 *     onClose={handleClose}
 *     backgroundColor="#fff"
 *     color="#000"
 * >
 *     <StyledMenuItem text="Option 1" />
 *     <StyledMenuItem text="Option 2" onClick={handleOption2Click} />
 * </StyledMenu>
 */
export const StyledMenu: React.FC<StyledMenuProps> = ({
    children,
    id,
    onClose,
    anchorEl,
    isOpen = false,
    backgroundColor = Theme.appbarDark,
    color = Theme.secondary
}) => {
    const StyledMenu = styled(Menu)(() => ({
        [`& .MuiPaper-root`]: {
            backgroundColor: backgroundColor,
            color: color,
        },
    }))

    return <StyledMenu
        id={id && "basic-menu"}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
    >{children}</StyledMenu>
}

interface StyledMenuItemProps {
    backgroundColor?: string;
    color?: string;
    onClick?: () => void;
    text: string | number;
    fontSize?: string;
    padding?: string;
    textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";
}

/**
 * StyledMenuItem is a customizable menu item component that utilizes Material-UI's MenuItem.
 * It allows for specific styling options including background color, text color, and padding.
 *
 * @component
 *
 * @param {Object} props - The properties for the StyledMenuItem component.
 * @param {string} [props.backgroundColor=Theme.primary] - The background color of the menu item.
 * @param {string} [props.color=Theme.secondary] - The text color of the menu item.
 * @param {function} [props.onClick] - An optional callback function to be executed when the menu item is clicked.
 * @param {string|number} props.text - The text to be displayed inside the menu item.
 * @param {string} [props.fontSize="12px"] - The font size of the menu item text.
 * @param {string} [props.padding="10px"] - The padding of the menu item.
 * @param {"none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana"} [props.textTransform="none"] - The text transformation style of the menu item.
 *
 * @returns {JSX.Element} A JSX element that represents a styled Material-UI MenuItem.
 *
 * @example
 * <StyledMenuItem
 *     text="Settings"
 *     onClick={handleSettingsClick}
 *     backgroundColor="#f0f0f0"
 *     color="#333"
 * />
 */
export const StyledMenuItem: React.FC<StyledMenuItemProps> = ({
    backgroundColor = Theme.primary,
    color = Theme.secondary,
    onClick,
    text,
    textTransform = "none",
    fontSize = "12px",
    padding = "10px"
}) => {
    return (
        <MenuItem
            sx={{
                [`&.MuiMenuItem-root`]: {
                    textTransform: textTransform,
                    color: color,
                    fontSize: fontSize,
                    padding: padding,
                    backgroundColor: backgroundColor,
                }
            }}
            onClick={onClick}
        >{text}</MenuItem>
    )
}