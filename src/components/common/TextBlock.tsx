import { Icon } from "@iconify/react";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";
import { Column } from "../base/Column";
import { Container } from "../base/Container";
import { SizedBox } from "../base/Flex";
import { Text } from "../base/Text";
import { UnderlinedButton } from "../button/UnderlinedButton";
import { useDesign } from "../hooks/useDesign";
import { LeftProps } from "../interfaces/Base";

interface ITextBlockLink {
    text: string;
    link: string;
    withArrow?: false | true;
    isBlank?: false | true;
    showLine?: false | true;
}

interface TextBlockProps extends LeftProps {
    title: string;
    description: string[];
    color?: string;
    links?: ITextBlockLink[]
}

export const TextBlock: React.FC<TextBlockProps> = ({ isMobile, isDesktop, title, description, color, links }) => {
    return (
        <Column crossAxisSize="min" mainAxisSize={isMobile ? 'max' : 'min'}>
            <Text
                color={color ?? Theme.secondary}
                size={isMobile ? 22 : isDesktop ? 32 : 28}
                weight='bold'
                text={title}
            />
            <SizedBox height={30} />
            <Text
                color={color ?? Theme.secondary}
                size={isMobile ? 14 : 16}
                text={description.join(" ")}
            />
            {links && (
                <React.Fragment>
                    <SizedBox height={30} />
                    {links.map((link, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Container>
                                    <UnderlinedButton
                                        text={link.text}
                                        textColor={color ?? Theme.secondary}
                                        textSize={13}
                                        link={link.link}
                                        withArrow={link.withArrow}
                                        showLine={link.showLine ?? true}
                                        styles={{width: "auto"}}
                                        iconSize={1}
                                        isBlank={link.isBlank}
                                    />
                                </Container>
                                {links.length - 1 !== index && <SizedBox height={10} />}
                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            )}
        </Column>
    )
}

interface IconBlockProps {
    icon: string;
    width?: number | string;
    height?: number | string;
    padding?: string;
    backgroundColor?: string;
    color?: string;
}

export const IconBlock: React.FC<IconBlockProps> = ({
    icon,
    width,
    height,
    padding = '32px',
    backgroundColor = Theme.primary,
    color = Theme.secondary
}) => {
    const { isMobile } = useDesign()

    return (
        <Container backgroundColor={backgroundColor} width={width ?? 300} height={height ?? 300} padding={padding}>
            <Column crossAxis="center" mainAxis="center" mainAxisSize="max">
                <Icon icon={icon} height={isMobile ? "80%" : "50%"} width={isMobile ? "80%" : "90%"} color={color} />
            </Column>
        </Container>
    )
}