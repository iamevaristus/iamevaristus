import React from 'react';

interface PaddingProps {
    /** Streamlined padding in pixels */
    symmetric?: {
        /** Padding in pixels for vertical */
        vertical?: number;
        /** Padding in pixels for horizontal */
        horizontal?: number;
    };
    /** Padding for all sides in pixels */
    all?: number;
    /** Specific padding in pixels */
    only?: {
        /** Padding for the top side in pixels */
        top?: number;
        /** Padding for the bottom side in pixels */
        bottom?: number;
        /** Padding for the left side in pixels */
        left?: number;
        /** Padding for the right side in pixels */
        right?: number;
    };
    /** Child to be padded */
    children?: React.ReactNode;
}

export const Padding: React.FC<PaddingProps> = ({ symmetric, all, only, children }) => {
    // Calculate padding based on the props provided
    const paddingStyles: React.CSSProperties = {
        paddingTop: all !== undefined ? `${all}px` : only?.top !== undefined ? `${only.top}px` : 0,
        paddingBottom: all !== undefined ? `${all}px` : only?.bottom !== undefined ? `${only.bottom}px` : 0,
        paddingLeft: all !== undefined ? `${all}px` : only?.left !== undefined ? `${only.left}px` : 0,
        paddingRight: all !== undefined ? `${all}px` : only?.right !== undefined ? `${only.right}px` : 0,
        width: "100%"
    };

    if (symmetric) {
        paddingStyles.paddingTop = symmetric.vertical ? `${symmetric.vertical}px` : paddingStyles.paddingTop;
        paddingStyles.paddingBottom = symmetric.vertical ? `${symmetric.vertical}px` : paddingStyles.paddingBottom;
        paddingStyles.paddingLeft = symmetric.horizontal ? `${symmetric.horizontal}px` : paddingStyles.paddingLeft;
        paddingStyles.paddingRight = symmetric.horizontal ? `${symmetric.horizontal}px` : paddingStyles.paddingRight;
    }

    return <div style={paddingStyles}>{children}</div>;
};