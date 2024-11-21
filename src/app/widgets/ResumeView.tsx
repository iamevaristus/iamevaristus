import { Icon } from "@iconify/react/dist/iconify.js";
import Assets from "../../assets/Assets";
import { Column } from "../../components/base/Column";
import { useDesign } from "../../components/hooks/useDesign";
import { ModalProps } from "../../components/interfaces/Base";
import { PDFWebView } from "../../components/pdf/PDFWebView";
import { Theme } from "../../configuration/theme/Theme";
import { DrawerDialog } from "../../components/dialogs/DrawerDialog";
import { Container } from "../../components/base/Container";
import { Row } from "../../components/base/Row";
import { Text } from "../../components/base/Text";
import { Spacer } from "../../components/base/Flex";
import { Utility } from "../../utilities/Utility";

const ResumeView: React.FC<ModalProps> = ({ isOpen, handleClose }) => {
    const { isMobile } = useDesign();

    const asset = Assets.me.resume
    const download = () => {
        const anchor = document.createElement('a');
        anchor.href = asset;
        anchor.download = "Evaristus Adimonyemma's Resume";
        anchor.click();
    };

    return (
        <DrawerDialog
            isOpen={isOpen}
            handleClose={handleClose}
            width={isMobile ? "100%" : "90%"}
            bgColor={Theme.secondary}
            position="top"
        >
            <Column>
                <Container width="100%" padding="24px" backgroundColor={Theme.primary}>
                    <Row>
                        <Text text="Resume" size={24} color={Theme.secondary} />
                        <Spacer />
                        <Container
                            padding="3px 12px"
                            backgroundColor={Utility.lightenColor(Theme.primary, 25)}
                            borderRadius="3px"
                            onClick={() => download()}
                            hoverBackgroundColor={Utility.lightenColor(Theme.primary, 45)}
                        >
                            <Row gap="10px">
                                <Column style={{ padding: "2px 0 0 0" }}>
                                    <Text text="Download" size={15} color={Theme.secondary} />
                                </Column>
                                <Icon icon="line-md:downloading-loop" width="2em" height="2em" style={{color: Theme.secondary}} />
                            </Row>
                        </Container>
                    </Row>
                </Container>
                <PDFWebView
                    document={asset}
                    scale={10}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    canvasHeight="100%"
                    canvasWidth="100%"
                    loader={
                        <Column crossAxis="center" mainAxis="center" style={{
                            flex: '0 0 auto',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column' as 'column',
                            justifyContent: 'center',
                        }}>
                            <Icon
                                icon={"line-md:loading-twotone-loop"}
                                style={{
                                    width: isMobile ? "50px" : "100px",
                                    height: isMobile ? "50px" : "100px",
                                    color: Theme.secondary
                                }}
                            />
                        </Column>
                    }
                />
            </Column>
        </DrawerDialog>
    );
}

export default ResumeView