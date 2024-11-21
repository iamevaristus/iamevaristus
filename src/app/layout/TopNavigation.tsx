import React from "react";
import { useLocation } from "react-router-dom";
import Assets from "../../assets/Assets";
import { Column } from "../../components/base/Column";
import { Container } from "../../components/base/Container";
import { Spacer } from "../../components/base/Flex";
import { Image } from "../../components/base/Image";
import { Row } from "../../components/base/Row";
import { Text } from "../../components/base/Text";
import { Wrap } from "../../components/base/Wrap";
import { CircularIconButton } from "../../components/button/CircularIconButton";
import { DrawerDialog } from "../../components/dialogs/DrawerDialog";
import { useDesign } from "../../components/hooks/useDesign";
import { ModalProps } from "../../components/interfaces/Base";
import Routing from "../../configuration/routes/Routing";
import { Theme } from "../../configuration/theme/Theme";
import { Utility } from "../../utilities/Utility";

interface TopNavigationInterface {
    changeColor: boolean;
}

const TopNavigation: React.FC<TopNavigationInterface> = ({ changeColor }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const { isMobile } = useDesign()

    const links: NavigationInterface[] = [
        {title: "Home", link: Routing.instance.home.path},
        {title: "About", link: Routing.instance.about.path},
        {title: "Companies", link: Routing.instance.companies.path},
        // {title: "Communities", link: Routing.instance.communities.path},
        {title: "Contact", link: Routing.instance.contact.path}
    ]

    return (
        <React.Fragment>
            <Container
                padding="16px 24px"
                width="100%"
                style={{ transition: "all 0.6s" }}
                backgroundColor={changeColor ? Theme.primary : "transparent"}
            >
                <Row>
                    <Row gap="6px" mainAxisSize="min">
                        <Image
                            image={changeColor ? Assets.logo.white : Assets.logo.blue}
                            height={30}
                            width={30}
                            objectFit="contain"
                        />
                        <Text text="iamevaristus" color={changeColor ? Theme.secondary : Theme.primaryDark} size={16} />
                    </Row>
                    <Spacer />
                    {isMobile && (
                        <CircularIconButton
                            icon="solar:hamburger-menu-broken"
                            title="Menu"
                            size={0.8}
                            backgroundColor={changeColor ? Theme.secondary : Theme.primary}
                            color={changeColor ? Theme.primary : Theme.secondary}
                            onClick={() => setIsOpen(true)}
                        />
                    )}
                    {!isMobile && (
                        <Wrap spacing={10} runSpacing={10}>
                            {links.map((item, index) => (<TopNavigationItem item={item} key={index} changeColor={changeColor} />))}
                        </Wrap>
                    )}
                </Row>
            </Container>
            <TopNavigationDialog isOpen={isOpen && isMobile} handleClose={() => setIsOpen(false)} options={links} changeColor={changeColor} />
        </React.Fragment>
    )
}

interface NavigationInterface {
    title: string;
    link: string;
}

interface TopNavigationItemProps extends TopNavigationInterface {
    item: NavigationInterface;
}

const TopNavigationItem: React.FC<TopNavigationItemProps> = ({ item, changeColor }) => {
    const { isMobile } = useDesign()

    const location = useLocation()
    const currentPath = location.pathname;

    const isCurrent = currentPath === item.link || (
        currentPath.startsWith(item.link)
        && item.link !== '/' && currentPath !== '/'
        && item.link !== '' && currentPath !== ''
    );

    const textColor = changeColor
        ? isCurrent
            ? isMobile
                ? Theme.primary
                : Theme.secondary
            : Theme.hint
        : isCurrent
            ? Theme.primaryDark
            : Theme.hint
    const boxColor = changeColor ? Utility.lightenColor(Theme.primary, 50) : Theme.primary
    const hoverColor = isMobile && isCurrent
        ? Utility.lightenColor(boxColor, 60)
        : isCurrent && changeColor
            ? Utility.lightenColor(Theme.primary, 10)
            : Theme.hover

    return (
        <Container
            width={isMobile ? "100%" : "auto"}
            hoverBackgroundColor={hoverColor}
            backgroundColor={isMobile && isCurrent ? Utility.lightenColor(boxColor, 90) : "transparent"}
            padding="10px"
            style={{
                transition: "all 0.6s",
                borderLeft: isMobile && isCurrent ? `3px solid ${boxColor}` : "none"
            }}
            link={item.link}
        >
            <Column crossAxis={isMobile ? "flex-start" : "center"} gap="4px">
                <Text text={item.title} color={textColor} />
                {(isCurrent && !isMobile) && (
                    <Column
                        style={{
                            transition: "all 0.6s",
                            backgroundColor: boxColor,
                            borderRadius: "10px",
                            width: "15px",
                            height: "2px"
                        }}
                    />
                )}
            </Column>
        </Container>
    )
}

interface TopNavigationDialogProps extends ModalProps {
    options: NavigationInterface[];
    changeColor: boolean;
}

const TopNavigationDialog: React.FC<TopNavigationDialogProps> = ({ options, isOpen, handleClose, changeColor }) => {
    return (
        <DrawerDialog
            isOpen={isOpen}
            handleClose={handleClose}
            position="bottom"
            bgColor={changeColor ? Theme.primary : Theme.secondary}
            width="100%"
            paperStyle={{
                borderRadius: "24px 24px 0 0",
            }}
        >
            <Column crossAxis="flex-start" style={{ padding: "10px 0 0" }}>
                {options.map((option, index) => (<TopNavigationItem item={option} key={index} changeColor={changeColor} />))}
            </Column>
        </DrawerDialog>
    )
}

export default TopNavigation