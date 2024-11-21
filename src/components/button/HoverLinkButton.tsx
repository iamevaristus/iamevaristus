import React from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '../../configuration/theme/Theme';
import { SizedBox } from '../base/Flex';
import { Image } from '../base/Image';
import { Row } from '../base/Row';

interface HoverLinkButtonProps {
    value: string;
    link: string;
    image?: string;
    padding?: string;
    borderRadius?: string;
    backgroundColor?: string;
    fontSize?: string;
    color?: string;
    centered?: boolean;
    onTap?: () => void;
}

export const HoverLinkButton: React.FC<HoverLinkButtonProps> = ({
    value,
    link,
    image,
    padding = '16px',
    borderRadius = '18px',
    backgroundColor = Theme.appbarDark,
    fontSize = '16px',
    color = Theme.secondary,
    centered = false,
    onTap
}) => {
    const styles: React.CSSProperties = {
        flex: 1,
        color: color,
        width: '100%',
        cursor: 'pointer',
        padding: padding,
        fontSize: fontSize,
        alignSelf: centered ? 'center' : 'flex-start',
        transition: '0.3s',
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
        display: "inline-block"
    };

    const hoverStyles: React.CSSProperties = {
        color: backgroundColor,
        borderRadius: '50px',
        backgroundColor: color,
    };

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Link onClick={onTap} to={link} style={isHovered ? { ...styles, ...hoverStyles } : styles} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Row crossAxis='center' mainAxis={centered ? 'center' : 'flex-start'}>
                {image && <Image image={image} width={35} />}
                {image && <SizedBox width={20} />}
                {value}
            </Row>
        </Link>
    );
};