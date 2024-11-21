import React from 'react';
import { Utility } from '../../utilities/Utility';

interface ImageUtilityProps {
    image: string;
    alt?: string;
    fallback?: string;
    height?: number | string;
    width?: number | string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    style?: React.CSSProperties;
}

export const Image: React.FC<ImageUtilityProps> = ({
    image,
    fallback,
    alt = "asset",
    height = "auto",
    width = "auto",
    objectFit = 'cover',
    style
}) => {
    const imgStyle: React.CSSProperties = {
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        objectFit: objectFit,
        ...style
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = fallback || Utility.DEFAULT_IMAGE;
    };

    return (
        <img src={image || Utility.DEFAULT_IMAGE} style={imgStyle} onError={handleError} alt={alt} />
    );
}