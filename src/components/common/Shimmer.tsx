import React from "react";

interface ShimmerProps {
    height?: number | string;
    radius?: number;
    width?: number | string;
    type?: '' | 'circular';
    dimmed?: boolean;
    dimmedColors?: string;
    shimmerColors?: string;
}

export const Shimmer: React.FC<ShimmerProps> = ({
    height = 60,
    radius = 10,
    width = 60,
    type = '',
    dimmed = false,
    dimmedColors = "#666666 0%, #777777 20%, #888888 40%, #777777 60%, #777777 80%, #666666 100%",
    shimmerColors = "#bdbdbd 0%, #eeeeee 20%, #fafafa 40%, #eeeeee 60%, #eeeeee 80%, #bdbdbd 100%"
}) => {
    const colors = dimmed ? dimmedColors : shimmerColors;

    return (
        <div className="shimmerContainer" style={{
            width: typeof width === 'string' ? width : `${width}px`,
            height: typeof height === 'string' ? height : `${height}px`,
        }}>
            <div className="shimmerBox" style={{
                height: '100%',
                borderRadius: type === '' ? `${radius}px` : type === 'circular' ? "50%" : `${radius}px`,
                width: '100%'
            }}></div>
            <style>
                {`
                    .shimmerContainer {
                        position: relative;
                        overflow: hidden;
                    }

                    .shimmerBox {
                        background: linear-gradient(
                            to right,
                            ${colors}
                        );
                        background-size: 800%;
                        animation: shimmer 2s ease-in-out infinite;
                        width: 100%;
                    }

                    @keyframes shimmer {
                        0% {
                            background-position: -200px 0;
                        }

                        100% {
                            background-position: 200px 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};