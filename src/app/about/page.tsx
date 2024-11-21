import React from "react";
import { RouteInterface } from "../../configuration/routes/Route";
import Title from "../../components/Title";
import { Column } from "../../components/base/Column";
import { Container } from "../../components/base/Container";
import { Theme } from "../../configuration/theme/Theme";
import { Text } from "../../components/base/Text";
import { useDesign } from "../../components/hooks/useDesign";
import { Image } from "../../components/base/Image";
import Assets from "../../assets/Assets";
import { Row } from "../../components/base/Row";
import { SizedBox, Spacer } from "../../components/base/Flex";
import { Utility } from "../../utilities/Utility";
import { Step } from "../../components/steps/Step";
import MoreAboutMe from "./widgets/MoreAboutMe";
import Skillsets from "./widgets/Skillsets";

export default function AboutRoute(): RouteInterface {
    return {
        path: "/about",
        page: <Layout />,
    }
}

const Layout: React.FC = () => {
    const  { isMobile } = useDesign()

    const getInformation = () => {
        return (
            <Column gap="20px" style={{padding: "0 24px"}}>
                <Text text="Who I Am" size={24} weight="bold" color={Theme.hint} />
                <Text
                    text={[
                        "Hi, I’m Evaristus Adimonyemma – a CEO, entrepreneur, software engineer, and music enthusiast",
                        "who thrives on creating and inspiring. Whether I’m leading a team, designing scalable software",
                        "solutions, or conducting a choir, I bring passion and dedication to everything I do.",
                        "and inspire growth in every project I undertake."
                    ].join(" ")}
                    size={20}
                    color={Theme.primaryDark}
                />
            </Column>
        )
    }

    const myPassions = [
        {
            title: "Building Scalable Products",
            comment: [
                "I specialize in crafting software solutions that solve real-world problems",
                "while prioritizing efficiency and scalability"
            ]
        },
        {
            title: "Music composition, arrangement and conduction",
            comment: [
                "Writing, arranging, and conducting for choirs and orchestras is my creative outlet.",
                "Music allows me to blend structure with artistic freedom, much like engineering."
            ]
        },
        {
            title: "Basketball",
            comment: [
                "When I’m not coding or composing, you’ll find me on the court.",
                "Basketball teaches me teamwork, strategy, and focus – skills I carry into my professional life."
            ]
        }
    ]

    return (
        <React.Fragment>
            <Title title="About" description="Information about me as a human being" />
            <Column gap="80px">
                <Container backgroundColor={Theme.primary} padding={isMobile ? "120px 20px" : "180px 20px"}>
                    <Column>
                        <Text text="More about," size={18} weight="lighter" color={Theme.secondary} />
                        <Text
                            text="Evaristus Adimonyemma"
                            size={isMobile ? 30 : 80}
                            weight="bold"
                            color={Theme.secondary}
                            style={{ letterSpacing: "-1.5px" }}
                        />
                    </Column>
                </Container>
                {!isMobile && (
                    <Row gap="10px" style={{ padding: "0 24px" }}>
                        {getInformation()}
                        <Spacer />
                        <Image image={Assets.me.whoIAm} width={500} />
                    </Row>
                )}
                {isMobile && (
                    <Column gap="40px">
                        {getInformation()}
                        <Image image={Assets.me.whoIAm} width="100%" />
                    </Column>
                )}
                <Container backgroundColor={Theme.secondary} padding="60px 20px">
                    <Column crossAxis="center">
                        <Text
                            text="In everything, I do what I must to build and create things that the audience can relate to."
                            size={isMobile ? 35 : 45}
                            align="center"
                            weight="bold"
                            color={Theme.primary}
                        />
                        <SizedBox height={20} />
                        <MoreAboutMe />
                    </Column>
                </Container>
                <Container backgroundColor={Utility.lightenColor(Theme.primary, 9)} padding="120px 20px">
                    <Column style={{padding: "0 24px"}}>
                        <Text text="My Passions" size={24} weight="bold" color={Theme.secondary} />
                        <SizedBox height={20} />
                        {myPassions.map((item, index) => (
                            <Step
                                key={index}
                                content={
                                    <Column>
                                        <Text text={item.title} size={18} color={Theme.primaryDark} />
                                        <Text text={item.comment.join(" ")} size={16} color={Theme.secondary} />
                                    </Column>
                                }
                                color={Theme.primaryDark}
                                showBottom={index !== myPassions.length - 1}
                            />
                        ))}
                    </Column>
                </Container>
                <Skillsets />
            </Column>
        </React.Fragment>
    )
}