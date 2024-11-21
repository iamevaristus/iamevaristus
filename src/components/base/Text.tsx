import React from 'react';

interface TextProps {
    text: string;
    size?: number;
    weight?: React.CSSProperties['fontWeight'];
    align?: 'left' | 'right' | 'center' | 'justify';
    fontStyle?: 'normal' | 'italic' | 'oblique';
    flow?: 'clip' | 'ellipsis' | 'string';
    color?: string;
    wrap?: boolean;
    lines?: number;
    fontFamily?: string;
    decoration?: 'none' | 'underline' | 'overline' | 'line-through';
    autoSize?: boolean;
    opacity?: number;
    style?: React.CSSProperties;
}

export const Text = React.forwardRef<HTMLDivElement, TextProps>(({
    text,
    size = 14,
    weight = 'normal',
    align = 'left',
    fontStyle = 'normal',
    flow = 'clip',
    color = '#000000',
    wrap = true,
    lines,
    fontFamily,
    decoration,
    autoSize = false,
    opacity = 1,
    style
}, ref) => {
    const baseStyle: React.CSSProperties = {
        fontSize: size,
        fontWeight: weight,
        textAlign: align,
        fontStyle: fontStyle,
        color: color,
        whiteSpace: wrap || flow !== 'ellipsis' ? 'normal' : 'nowrap',
        overflow: flow === 'ellipsis' ? 'hidden' : 'visible',
        textOverflow: flow,
        WebkitLineClamp: lines,
        display: lines ? '-webkit-box' : 'block',
        WebkitBoxOrient: 'vertical',
        fontFamily: fontFamily,
        textDecoration: decoration,
        opacity: opacity,
        ...style
    };

    return autoSize ? (
        <div ref={ref} style={{ ...baseStyle }}>
            {text}
        </div>
    ) : (
        <span ref={ref} style={{ ...baseStyle }}>
            {text}
        </span>
    );
});