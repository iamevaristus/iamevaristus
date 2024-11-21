import { FlexProps } from "../interfaces/Base";
import React from "react";

export const Row: React.FC<FlexProps> = ({
    children,
    crossAxis = 'center',
    mainAxis = 'flex-start',
    mainAxisSize = 'max',
    crossAxisSize = 'min',
    style,
    onClick,
    gap
}) => {
    const renderChildren = () => {
        if (Array.isArray(children)) {
            return (
                <>
                    {children.map((child, index) => (
                        <React.Fragment key={index}>{child}</React.Fragment>
                    ))}
                </>
            );
        }
        return children;
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: crossAxis,
                justifyContent: mainAxis,
                width: mainAxisSize === 'max' ? '100%' : 'auto',
                height: crossAxisSize === 'max' ? '100%' : 'auto',
                gap: gap,
                ...style,
            }}
            onClick={onClick}
        >
            {renderChildren()}
        </div>
    );
};