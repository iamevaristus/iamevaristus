export interface FlexProps {
    children?: React.ReactNode | React.ReactNode[];
    crossAxis?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    mainAxis?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    mainAxisSize?: 'min' | 'max';
    crossAxisSize?: 'min' | 'max';
    style?: React.CSSProperties;
    onClick?: () => void;
    gap?: string;
}

export interface InteractiveProps {
    text: string;
    onTap?: () => void;
    radius?: number;
    backgroundColor?: string;
    textColor?: string;
    textSize?: number;
    iconSize?: number;
    link?: string;
    isBlank?: boolean;
    showLine?: boolean;
    opacity?: number;
    withArrow?: boolean;
    padding?: number;
    styles?: React.CSSProperties;
    isBold?: boolean;
}

export interface LeftProps {
    isMobile: boolean;
    isDesktop: boolean;
}
export interface IListView {
    header: string;
    description: string[];
    color: string;
    image?: string;
    position?: 'left' | 'right';
    link?: string;
    linkText?: string;
}
export interface ModalProps {
    handleClose: () => void;
    isOpen: boolean;
}