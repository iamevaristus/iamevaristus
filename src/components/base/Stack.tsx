import React from "react";

interface StackProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    height?: string;
    crossAxisSize?: 'min' | 'max'
}

export const Stack: React.FC<StackProps> = ({ children, style, height, crossAxisSize = 'max' }) => {
    const baseStyle: React.CSSProperties = {
        position: 'relative',
        height: height ?? '100vh',
        width: crossAxisSize === 'max' ? "100%" : 'auto',
        overflowY: 'auto',
        ...style,
    };

    return <div style={baseStyle}>{children}</div>;
};

interface PositionedProps {
    children: React.ReactNode;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    placement?: 'absolute' | 'relative' | 'fixed' | 'sticky';
    order?: number;
    style?: React.CSSProperties;
}

export const Positioned: React.FC<PositionedProps> = ({
    children,
    left,
    right,
    top,
    bottom,
    placement = 'absolute',
    order = 1,
    style,
}) => {
    const styled: React.CSSProperties = {
        position: placement,
        left,
        right,
        top,
        bottom,
        zIndex: order,
        ...style
    };

    return <div style={styled}>{children}</div>;
};
