import React from "react";
import { RouteInterface } from "../../configuration/routes/Route";
import Title from "../../components/Title";
import { Column } from "../../components/base/Column";
import { Text } from "../../components/base/Text";
import { Theme } from "../../configuration/theme/Theme";
import { Container } from "../../components/base/Container";
import { useDesign } from "../../components/hooks/useDesign";
import List from "../../configuration/List";
import { Image } from "../../components/base/Image";
import { SizedBox } from "../../components/base/Flex";
import { Row } from "../../components/base/Row";
import { Navigate } from "../../utilities/Navigate";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CircularIconButton } from "../../components/button/CircularIconButton";
import { Wrap } from "../../components/base/Wrap";
import { Utility } from "../../utilities/Utility";
import { RatingIcon } from "../../components/common/Rating";

export default function CompaniesRoute(): RouteInterface {
    return {
        path: "/companies",
        page: <Layout />,
    }
}

const Layout: React.FC = () => {
    const  { isMobile } = useDesign()

    return (
        <React.Fragment>
            <Title title="Companies" description="Companies I started or worked with" />
            <Container backgroundColor={Theme.secondary} padding={isMobile ? "120px 20px" : "180px 20px"}>
                <Column>
                    <Text text="Companies I've" size={18} weight="lighter" color={Theme.primary} />
                    <Text
                        text="built, co-founded or worked with..."
                        size={isMobile ? 30 : 80}
                        weight="bold"
                        color={Theme.primary}
                        style={{ letterSpacing: "-1.5px" }}
                    />
                </Column>
            </Container>
            {List.resume.company.items.map((company, index) => (
                <Column key={index} gap="5px" style={{ backgroundColor: company.color, padding: "24px" }}>
                    <Image image={company.logo} height={300} width="100%" objectFit="contain" />
                    <SizedBox height={20} />
                    <Row gap="8px">
                        <Text text={company.name} size={24} color={Theme.secondary} />
                        {company.is_featured && (<RatingIcon rating={5} color={Theme.secondary} />)}
                    </Row>
                    <Text text={`"${company.tag}"`} size={14} color={Theme.hover} />
                    <SizedBox height={5} />
                    <Text text={company.description} size={16} color={Theme.hint} />
                    {company.website && (
                        <React.Fragment>
                            <SizedBox height={10} />
                            <Row>
                                <Container
                                    border={`1px solid ${Theme.secondary}`}
                                    padding="5px"
                                    borderRadius="6px"
                                    onClick={() => Navigate.openInNewTab(company.website)}
                                    hoverBackgroundColor={Utility.lightenColor(company.color, 30)}
                                >
                                    <Row gap="3px">
                                        <Column style={{ padding: "2px 0 0"}}>
                                            <Text text={`Learn more about ${company.name}`} color={Theme.secondary} />
                                        </Column>
                                        <Icon
                                            icon="solar:round-arrow-right-up-bold"
                                            width="1.4em"
                                            height="1.4em"
                                            style={{color: Theme.secondary}}
                                        />
                                    </Row>
                                </Container>
                            </Row>
                        </React.Fragment>
                    )}
                    {company.social && (
                        <React.Fragment>
                            <SizedBox height={20} />
                            <Text text={`Connect with ${company.name}`} color={Theme.secondary} />
                            <Wrap runSpacing={10} spacing={10} crossAxisAlignment="center">
                                {company.social.map((media, i) => (
                                    <CircularIconButton
                                        key={i}
                                        icon={media.icon}
                                        title=""
                                        size={0.7}
                                        backgroundColor={Theme.secondary}
                                        color={company.color}
                                        buttonStyle={{ padding: "4px" }}
                                        iconStyle={{ borderRadius: "50%" }}
                                        onClick={() => Navigate.openInNewTab(media.path ?? "")}
                                    />
                                ))}
                            </Wrap>
                        </React.Fragment>
                    )}
                </Column>
            ))}
        </React.Fragment>
    )
}