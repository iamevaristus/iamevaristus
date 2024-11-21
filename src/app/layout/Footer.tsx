import React from "react";
import { Container } from "../../components/base/Container";
import { Theme } from "../../configuration/theme/Theme";
import { Row } from "../../components/base/Row";
import { Image } from "../../components/base/Image";
import { Text } from "../../components/base/Text";
import Assets from "../../assets/Assets";
import { SizedBox } from "../../components/base/Flex";
import { CURRENT_VERSION } from "../../generator/getVersion";

const Footer: React.FC = () => {
    return (
        <React.Fragment>
            <Container backgroundColor={Theme.primary} padding="2px" width="100%" />
            <Container backgroundColor={Theme.secondary} padding="16px" width="100%">
                <Row mainAxis="space-between" gap="10px">
                    <Image
                        image={Assets.logo.blue}
                        height={20}
                        width={20}
                        objectFit="contain"
                    />
                    <Text text={`Current version: ${CURRENT_VERSION}`} />
                </Row>
                <SizedBox height={10} />
                <Text text="Copyright © 2024. Evaristus Adimonyemma. All Right Reserved" />
            </Container>
        </React.Fragment>
    )
}

export default Footer;