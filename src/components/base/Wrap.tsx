import React from "react";

interface WrapProps {
    children?: React.ReactNode;
    spacing?: number;
    runSpacing?: number;
    style?: React.CSSProperties;
    crossAxisAlignment?: 'flex-start' | 'center' | 'flex-end';
}

export const Wrap: React.FC<WrapProps> = ({
    children,
    spacing = 0,
    runSpacing = 0,
    style,
    crossAxisAlignment = 'flex-start',
}) => {
    const renderChildren = () => {
        // if (Array.isArray(children)) {
        //     return (
        //         <>
        //             {children.map((child, index) => (
        //                 <React.Fragment key={index}>{child}</React.Fragment>
        //             ))}
        //         </>
        //     );
        // }
        return children;
    };

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: `${runSpacing}px ${spacing}px`,
                alignItems: crossAxisAlignment,
                ...style,
            }}
        >
            {renderChildren()}
        </div>
    );
};