import { Icon } from "@iconify/react";
import { Row } from "../base/Row";
import { SizedBox } from "../base/Flex";
import { Text } from "../base/Text";
import { useState } from "react";
import { Link } from "react-router-dom";

interface LinkedButtonProps {
    text: string;
    radius?: number;
    backgroundColor?: string;
    textColor?: string;
    textSize?: number;
    iconSize?: number;
    link: string;
    opacity?: number;
    showNext?: boolean;
}

export const LinkedButton: React.FC<LinkedButtonProps> = ({
    text,
    textColor = '#000000',
    textSize = 14,
    iconSize = 0.7,
    link,
    showNext = false
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleHover = (value: boolean) => {
        setIsHovered(value);
    };

    const buttonStyle = {
        borderBottom: isHovered ? `2.5px ${textColor} solid` : `1px ${textColor} solid`,
        display: 'inline-block',
        padding: '4px 0',
        cursor: 'pointer',
        width: 'auto',
        transition: 'background-color 0.3s, color 0.3s',
    };

    const render = () => {
        if(showNext) {
            return (
                <>
                    <SizedBox width={5} />
                    <Icon
                        icon="material-symbols-light:keyboard-arrow-right"
                        width={`${iconSize}em`}
                        height={`${iconSize}em`}
                        style={{
                            color: textColor,
                            transition: '0.5s',
                        }}
                    />
                </>
            )
        } else {
            return (<></>)
        }
    }

    return (
        <Row crossAxis="center" crossAxisSize="min" mainAxisSize="min">
            <Link to={link} style={buttonStyle} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                <Text text={text} color={textColor} size={textSize} />
            </Link>
            {render()}
        </Row>
    );
};