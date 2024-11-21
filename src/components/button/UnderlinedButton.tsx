import { Icon } from "@iconify/react";
import { Expanded, SizedBox } from "../base/Flex";
import { Row } from "../base/Row";
import { Text } from "../base/Text";
import { InteractiveProps } from "../interfaces/Base";
import React from "react";
import { Link } from "react-router-dom";

export const UnderlinedButton: React.FC<InteractiveProps> = ({
    text,
    onTap,
    textColor = '#000000',
    textSize = 14,
    iconSize = 0.7,
    link,
    isBlank = false,
    showLine = false,
    withArrow = false,
    styles,
    isBold = false
}) => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);

    const handleHover = (value: boolean) => {
        setIsHovered(value);
    };

    const buttonStyle = {
        borderBottom: isHovered ? `2.5px ${textColor} solid` : showLine ? `1px ${textColor} solid` : 'none',
        display: 'inline-block',
        padding: '0 0 4px 0',
        cursor: 'pointer',
        width: '100%',
        transition: 'all 0.3s, color 0.3s',
        ...styles,
    };

    const content = (
        <Text text={text} weight={isBold ? 'bold': 'normal'} color={textColor} size={textSize} />
    );

    const renderArrow = () => {
        if(withArrow) {
            return (
                <>
                    <SizedBox width={20} />
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

    const renderContent = (): JSX.Element => {
        return (
            <React.Fragment>
                <Expanded>
                    {content}
                </Expanded>
                {renderArrow()}
            </React.Fragment>
        )
    }

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
                <Row>{renderContent()}</Row>
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
                <Row>{renderContent()}</Row>
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
                <Row>{renderContent()}</Row>
            </div>
        );
    }
};