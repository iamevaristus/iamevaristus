import React from "react";
import { Link } from "react-router-dom";

type ContainerProps = {
    height?: string | number;
    width?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    style?: React.CSSProperties;
    borderRadius?: string;
    border?: string;
    boxShadow?: string;
    elevation?: number; // Elevation level for shadow
    children?: React.ReactNode;
    onClick?: (() => void) | ((event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>) => void);
    hoverBackgroundColor?: string;
    hoverBoxShadow?: string; // Dynamic hover shadow
    link?: string;
    onHover?: (value: boolean) => void;
    hoverStyle?: React.CSSProperties;
    renderAsButton?: boolean; // Optional flag to render as button
    containerRef?: React.LegacyRef<HTMLDivElement> | null;
};

/**
 * Helper function to compute elevation-based shadow.
 * @param {number} elevation - The level of shadow elevation.
 * @returns {string} - A CSS box-shadow value.
 */
const getElevationShadow = (elevation: number): string => {
    const baseShadow = `rgba(0, 0, 0, 0.15)`;
    const shadowDepth = elevation * 0.5;
    return `0px ${shadowDepth}px ${shadowDepth * 2}px ${baseShadow}`;
};

/**
 * A flexible container component that can dynamically render a <div>, <Link>, or <button> element.
 * Supports dynamic styles and hover effects, including shadow and background color.
 *
 * @param {ContainerProps} props - The properties of the container.
 * @returns {JSX.Element} - A styled container component.
 */
export const Container: React.FC<ContainerProps> = ({
    height = 'auto',
    width = 'auto',
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    padding = '0',
    margin = '0',
    backgroundColor = 'transparent',
    borderRadius = '0',
    border = '',
    boxShadow = 'none',
    elevation = 0, // Default elevation
    children,
    style,
    onClick,
    onHover = () => {},
    hoverBackgroundColor,
    hoverBoxShadow,
    link,
    hoverStyle,
    containerRef,
    renderAsButton = false, // Optional flag to render as button
}) => {
    // Compute the boxShadow based on elevation, if boxShadow is not explicitly provided
    const computedBoxShadow = elevation > 0 ? getElevationShadow(elevation) : boxShadow;

    const cStyle: React.CSSProperties = {
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
        minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        padding,
        margin,
        backgroundColor,
        borderRadius,
        border,
        boxSizing: 'border-box',
        display: "block",
        boxShadow: computedBoxShadow,
        cursor: onClick || link || renderAsButton ? "pointer" : "auto",
        ...style,
    };

    // Hover effect styles to be applied dynamically
    const hStyle: React.CSSProperties = {
        backgroundColor: hoverBackgroundColor,
        boxShadow: hoverBoxShadow ? hoverBoxShadow : computedBoxShadow,
        ...hoverStyle,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>) => {
        if (hoverBackgroundColor || hoverBoxShadow) {
            Object.assign(e.currentTarget.style, hStyle);
        }
        onHover(true);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>) => {
        if (hoverBackgroundColor || hoverBoxShadow) {
            Object.assign(e.currentTarget.style, {
                backgroundColor,
                boxShadow: computedBoxShadow,
            });
        }
        onHover(false);
    };

    if (link) {
        return (
            <Link
                to={link}
                style={cStyle}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    if (onClick) onClick(event);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </Link>
        );
    } else if (renderAsButton) {
        return (
            <button
                style={cStyle}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    if (onClick) onClick(event);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </button>
        );
    } else {
        return (
            <div
                style={cStyle}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    if (onClick) onClick(event);
                }}
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
        );
    }
};
