import React from 'react';

interface ScrollableProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    scrollbarThumbColor?: string;
    scrollbarTrackColor?: string;
    className?: string;
    trackStyle?: React.CSSProperties;
    thumbStyle?: React.CSSProperties;
    thumbHoverStyle?: React.CSSProperties;
    scrollBarStyle?: React.CSSProperties;
}

export const Scrollable: React.FC<ScrollableProps> = ({
    children,
    style = {},
    scrollbarThumbColor = '#888',
    scrollbarTrackColor = '#f1f1f1',
    className = '',
    thumbHoverStyle = {},
    thumbStyle = {},
    trackStyle = {},
    scrollBarStyle = {},
}) => {
    // Helper function to convert JS styles to inline CSS
    const cssToString = (styles: React.CSSProperties): string => {
        return Object.entries(styles)
            .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
            .join(' ');
    };

    // Inline styles for the scrollable container and the dynamic scrollbar
    const scrollableStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        ...style,
    };

    return (
        <div className={className} style={scrollableStyle}>
            {children}
            <style>{`
                /* For WebKit browsers */
                div::-webkit-scrollbar {
                    width: 4px;
                    cursor: pointer;
                    ${cssToString(scrollBarStyle)}
                }

                /* For WebKit browsers - Track */
                div::-webkit-scrollbar-track {
                    background: ${scrollbarTrackColor};
                    ${cssToString(trackStyle)}
                }

                /* For WebKit browsers - Thumb */
                div::-webkit-scrollbar-thumb {
                    background: ${scrollbarThumbColor};
                    border-radius: 5px;
                    cursor: pointer;
                    ${cssToString(thumbStyle)}
                }

                div::-webkit-scrollbar-thumb:hover {
                    background-color: ${scrollbarThumbColor !== '#888' ? '#666' : '#555'};
                    ${cssToString(thumbHoverStyle)}
                }
            `}</style>
        </div>
    );
};
