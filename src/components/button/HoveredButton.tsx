import { Text } from "../base/Text";
import { InteractiveProps } from "../interfaces/Base";
import React from "react";
import { Link } from "react-router-dom";

export const HoveredButton: React.FC<InteractiveProps> = ({
    text,
    onTap,
    radius,
    backgroundColor = 'transparent',
    textColor = '#050404',
    textSize = 14,
    link,
    isBlank = false,
    opacity = 1,
    padding = 4
}) => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);

    const handleHover = (value: boolean) => {
        setIsHovered(value);
    };

    const bgHoverColor = () => {
        if(isHovered && backgroundColor !== 'transparent') {
            return textColor;
        } else if(isHovered && backgroundColor === 'transparent') {
            return 'transparent';
        } else {
            return backgroundColor;
        }
    }

    const txtHoverColor = () => {
        if(isHovered && backgroundColor !== 'transparent') {
            return backgroundColor;
        } else {
            return textColor;
        }
    }

    const txtHoverOpacity = () => {
        if(isHovered && backgroundColor === 'transparent') {
            return 0.5;
        } else {
            return opacity;
        }
    }

    const buttonStyle = {
        borderRadius: radius ? `${radius}px` : '12px',
        backgroundColor: bgHoverColor(),
        display: 'inline-block',
        padding: isHovered ? `${padding + 3}px` : `${padding}px`,
        cursor: 'pointer',
        alignSelf: "center",
        transition: 'background-color 0.3s, color 0.3s',
    };

    const content = (
        <Text text={text} color={txtHoverColor()} size={textSize} opacity={txtHoverOpacity()} />
    );

    if (isBlank && link) {
        return (
            <a
                href={link}
                target='_blank'
                rel='noreferrer noopener'
                style={buttonStyle}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                onClick={onTap}
            >
                {content}
            </a>
        );
    } else if (link) {
        return (
            <Link
                to={link}
                style={buttonStyle}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                onClick={onTap}
            >
                {content}
            </Link>
        );
    } else {
        return (
            <div
                style={buttonStyle}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                onClick={onTap}
            >
                {content}
            </div>
        );
    }
};