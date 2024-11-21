import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Assets from "../assets/Assets";
import { Column } from "../components/base/Column";
import { Container } from "../components/base/Container";
import { SizedBox } from "../components/base/Flex";
import { Image } from "../components/base/Image";
import { Row } from "../components/base/Row";
import { Positioned } from "../components/base/Stack";
import { Text } from "../components/base/Text";
import { Wrap } from "../components/base/Wrap";
import { CircularIconButton } from "../components/button/CircularIconButton";
import { useDesign } from "../components/hooks/useDesign";
import List from "../configuration/List";
import { RouteInterface } from "../configuration/routes/Route";
import { Theme } from "../configuration/theme/Theme";
import { Navigate } from "../utilities/Navigate";
import { Utility } from "../utilities/Utility";
import { Step } from "../components/steps/Step";
import Title from "../components/Title";
import Constants from "../configuration/Constants";
import ResumeView from "./widgets/ResumeView";

export default function HomeRoute(): RouteInterface {
    return {
        path: "/",
        page: <Layout />,
    }
}

const Layout: React.FC = () => {
    const  { isMobile, isDesktop, width } = useDesign()
    const [isResumeOpen, setIsResumeOpen] = React.useState(false);

    const getInformation = () => {
        const textSize = isDesktop ? 60 : 35;

        return (
            <Column gap="20px" style={{padding: "0 24px"}}>
                <Row>
                    <Container padding="8px" borderRadius="8px" border={`2px solid ${Theme.hint}`}>
                        <Column>
                            <Text text="Hello there," color={Theme.primaryDark} />
                            <Text text="I am Evaristus Adimonyemma" size={16} color={Theme.primaryDark} />
                        </Column>
                    </Container>
                </Row>
                <Column gap="8px">
                    <Text text="Entrepreneur, CEO, and Software Engineer" weight="450" size={textSize} color={Theme.primaryDark} />
                    <Text text="with love for tech, music and basketball" size={textSize - 10} color={Theme.primaryDark} />
                </Column>
                <Text
                    text={[
                        "With a creative flair for tech, a passion for music, and a love for basketball,",
                        "I lead with vision and purpose, combining strategic leadership, entrepreneurial spirit,",
                        "and deep technical expertise to craft innovative solutions, build meaningful connections,",
                        "and inspire growth in every project I undertake."
                    ].join(" ")}
                    size={15}
                    color={Theme.hint}
                />
                <Row gap="10px">
                    <Text text="Find me on:" color={Theme.primaryDark} />
                    <Wrap runSpacing={5} spacing={5}>
                        {List.socialMedia.map((media, index) => (
                            <CircularIconButton
                                key={index}
                                icon={media.icon}
                                title={media.header ?? ""}
                                size={0.7}
                                backgroundColor={Theme.primary}
                                color={Theme.secondary}
                                buttonStyle={{ padding: "4px" }}
                                iconStyle={{ borderRadius: "50%" }}
                                onClick={() => Navigate.openInNewTab(media.path ?? "")}
                            />
                        ))}
                    </Wrap>
                </Row>
                <Wrap runSpacing={10} spacing={10}>
                    {[
                        {
                            text: "Get in touch",
                            onClick: () => Navigate.openInNewTab(`mailto:${Constants.emailAddress}`),
                            icon: "solar:arrow-right-up-broken"
                        },
                        {
                            text: "View resume",
                            onClick: () => setIsResumeOpen(true),
                            icon: "solar:arrow-to-top-right-broken"
                        }
                    ].map((action, index) => (
                        <Container
                            key={index}
                            padding="9px"
                            backgroundColor={Utility.lightenColor(Theme.primary, 25)}
                            boxShadow={`4px 4px ${Theme.primary}`}
                            borderRadius="3px"
                            onClick={action.onClick}
                            hoverBackgroundColor={Utility.lightenColor(Theme.primary, 45)}
                        >
                            <Row gap="10px">
                                <Text text={action.text} size={15} color={Theme.secondary} />
                                <Icon icon={action.icon} width="1em" height="1em" style={{color: Theme.secondary}} />
                            </Row>
                        </Container>
                    ))}
                </Wrap>
            </Column>
        )
    }

    const getHeader = () => {
        return (
            <React.Fragment>
                {getInformation()}
                <Image image={Assets.me.avatar} width={isMobile ? "100%" : width < 800 ? 350 : width < 1000 ? 400 : 600} />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Title title="Home" description="Welcome to the world of possibilities!" />
            <Column gap="80px" style={{padding: "48px 0"}}>
                {!isMobile && (<Row gap="10px">{getHeader()}</Row>)}
                {isMobile && (<Column gap="20px">{getHeader()}</Column>)}
                <Spinner />
                <Featured />
            </Column>
            <ResumeView isOpen={isResumeOpen} handleClose={() => setIsResumeOpen(false)} />
        </React.Fragment>
    )
}

const Spinner: React.FC = () => {
    const { width } = useDesign()
    const skills = ["JavaScript", "Music", "React", "Piano", "TypeScript", "Basketball", "Flutter", "Java", "SQL"];

    return (
        <Column style={{ position: "relative" }}>
            <Positioned>
                <Container
                    width={width}
                    padding="12px"
                    backgroundColor={Theme.primaryDark}
                    style={{ overflow: "hidden", }}
                >
                    <div style={{ display: "flex", gap: "100px", animation: "moveLeft 10s linear infinite" }}>
                        {skills.map((skill, index) => (
                            <Row key={index} gap="30px" crossAxis="center" mainAxisSize="min">
                                <Icon icon="uim:circle-layer" width="2em" height="2em"  style={{color: Theme.secondary}} />
                                <Container padding="4px 0 0 0">
                                    <Text text={skill} size={20} color={Theme.secondary} style={{ whiteSpace: "nowrap"}} />
                                </Container>
                            </Row>
                        ))}
                    </div>

                    <style>
                        {`
                            @keyframes moveLeft {
                                0% {
                                    transform: translateX(100%);
                                }
                                100% {
                                    transform: translateX(-100%);
                                }
                            }
                        `}
                    </style>
                </Container>
            </Positioned>
            <Container
                width={width}
                height={60}
                backgroundColor="#2720EBFF"
                style={{
                    transform: "rotate(1.5deg)",
                    transformOrigin: "center",
                }}
            />
        </Column>
    )
}

const Featured: React.FC = () => {
    const { isMobile } = useDesign()
    const webColor = Utility.lightenColor(Theme.primary, 35)

    return (
        <Column style={{ padding: "24px" }}>
            <Text text="Featured Companies" color={Theme.primaryDark} size={20} />
            <Container width="170px" height={2} backgroundColor={Theme.primary} />
            <SizedBox height={20} />
            <Wrap style={{ gap: "20px 2%" }}>
                {List.resume.company.items.filter(company => company.is_featured).map((company, index) => (
                    <Container
                        border={`1px solid ${Theme.appbarDark}`}
                        key={index}
                        width={isMobile ? "100%" : "49%"}
                        padding="10px"
                        borderRadius="12px"
                    >
                        <Row crossAxis="flex-end" gap="10px">
                            <Image image={company.logo} height={70} width={70} style={{ borderRadius: "12px" }} />
                            <Column>
                                {company.website && (
                                    <Row>
                                        <Container
                                            border={`1px solid ${webColor}`}
                                            padding="3px"
                                            borderRadius="6px"
                                            onClick={() => Navigate.openInNewTab(company.website)}
                                        >
                                            <Row gap="3px">
                                                <Icon icon="mingcute:world-fill" width="1em" height="1em" style={{color: webColor}} />
                                                <Text text="Visit website" color={webColor} />
                                            </Row>
                                        </Container>
                                    </Row>
                                )}
                                {company.website && (<SizedBox height={6} />)}
                                <Text text={company.name} color={Theme.primaryDark} size={20} />
                                <Text text={company.tag} color={Theme.primaryDark} size={14} />
                            </Column>
                        </Row>
                        <SizedBox height={20} />
                        <Text text={company.position} color={Theme.primaryDark} size={16} />
                        {[
                            {
                                title: "From",
                                value: company.from
                            },
                            {
                                title: "Till",
                                value: company.till
                            }
                        ].map((item, index) => (
                            <Step
                                content={
                                    <Column>
                                        <Text text={item.title} color={Theme.primaryDark} size={16} />
                                        <Text text={item.value} color={Theme.primaryDark} size={14} />
                                    </Column>
                                }
                                color={Theme.hint}
                                showBottom={index === 0}
                            />
                        ))}
                        <SizedBox height={20} />
                        <Row mainAxis="center" gap="10px">
                            <Container width={50} height={2} borderRadius="50%" backgroundColor={Theme.primary} />
                            <Container width={6} height={6} borderRadius="50%" backgroundColor={Theme.primary} />
                            <Container width={50} height={2} borderRadius="50%" backgroundColor={Theme.primary} />
                        </Row>
                        <SizedBox height={10} />
                        <Text text={company.description} color={Theme.primaryDark} size={15} />
                    </Container>
                ))}
            </Wrap>
        </Column>
    )
}