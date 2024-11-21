import { FlexProps } from "../interfaces/Base";
import React from "react";

export const Column: React.FC<FlexProps> = ({
    children,
    crossAxis = 'stretch',
    mainAxis = 'flex-start',
    mainAxisSize = 'min',
    crossAxisSize = 'max',
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
                flexDirection: 'column',
                alignItems: crossAxis,
                justifyContent: mainAxis,
                height: mainAxisSize === 'max' ? '100%' : 'auto',
                width: crossAxisSize === 'max' ? '100%' : 'auto',
                gap: gap,
                ...style,
            }}
            onClick={onClick}
        >
            {renderChildren()}
        </div>
    );
};