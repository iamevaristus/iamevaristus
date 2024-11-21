import { Icon } from "@iconify/react";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";
import { Column } from "../base/Column";
import { Container } from "../base/Container";
import { SizedBox } from "../base/Flex";
import { Text } from "../base/Text";
import { Wrap } from "../base/Wrap";
import { UnderlinedButton } from "../button/UnderlinedButton";
import { useDesign } from "../hooks/useDesign";
import { useWidth } from "../hooks/useWidth";
import { IListView } from "../interfaces/Base";

interface ListViewProps {
    list: IListView[];
    color?: string;
    isCentered?: boolean;
}

export const SpreadView: React.FC<ListViewProps> = ({list, color, isCentered}) => {
    const width = useWidth();
    const { isMobile } = useDesign()

    return (
        <Wrap runSpacing={80} spacing={30} style={{justifyContent: isCentered ? "center" : "flex-start"}}>
            {list.map((item, index) => {
                return (
                    <Container backgroundColor="transparent" width={width < 600 ? '100%' : "30%"} key={index}>
                        <Column>
                            <Icon icon={item.image ?? ""} height="32px" width="32px" color={item.color} />
                            <SizedBox height={30} />
                            <Text
                                color={color ?? item.color ?? Theme.primary}
                                size={isMobile ? 13 : 15}
                                weight='600'
                                text={item.header}
                            />
                            <SizedBox height={10} />
                            <Text
                                color={color ?? item.color ?? Theme.primary}
                                size={isMobile ? 13 : 15}
                                opacity={0.6}
                                text={item.description.join(" ")}
                            />
                            {(item.link && item.linkText) && (
                            <React.Fragment>
                                <SizedBox height={10} />
                                <Container>
                                    <UnderlinedButton
                                        text={item.linkText}
                                        textColor={item.color}
                                        textSize={12}
                                        link={item.link}
                                        styles={{width: "auto"}}
                                        withArrow
                                        showLine
                                        iconSize={1}
                                    />
                                </Container>
                            </React.Fragment>
                        )}
                        </Column>
                    </Container>
                )
            })}
        </Wrap>
    )
}