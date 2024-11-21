import React from "react";
import { RouteInterface } from "../../configuration/routes/Route";
import { useDesign } from "../../components/hooks/useDesign";
import Title from "../../components/Title";
import { Column } from "../../components/base/Column";
import { SizedBox, Spacer } from "../../components/base/Flex";
import { Row } from "../../components/base/Row";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Theme } from "../../configuration/theme/Theme";
import { Text } from "../../components/base/Text";
import Constants from "../../configuration/Constants";
import { Container } from "../../components/base/Container";
import { Wrap } from "../../components/base/Wrap";
import { CircularIconButton } from "../../components/button/CircularIconButton";
import List from "../../configuration/List";
import { Navigate } from "../../utilities/Navigate";
import { Field } from "../../components/forms/Field";
import { TextAreaField } from "../../components/forms/TextAreaField";
import { ActionButton } from "../../components/button/ActionButton";
import { send } from "@emailjs/browser";
import { Notify } from "../../utilities/Notify";

export default function ContactRoute(): RouteInterface {
    return {
        path: "/contact",
        page: <Layout />,
    }
}

const Layout: React.FC = () => {
    const  { isMobile } = useDesign()

    const [name, setName] = React.useState("")
    const [emailAddress, setEmailAddress] = React.useState("")
    const [comment, setComment] = React.useState("")
    const [isSending, setIsSending] = React.useState(false)

    const minCommentLength = 100

    async function sendConnect() {
        if(name === "" || name.length < 3) {
            Notify.warning("Your name is required and should be above 3 letters")
            return
        } else if(emailAddress === "" || !emailAddress.includes("@")) {
            Notify.warning("Your email address is required and should be properly formatted")
            return
        } else if(comment === "" || comment.length < minCommentLength) {
            Notify.warning(`Your message is required and should be above ${minCommentLength} letters`)
            return
        }

        if(isSending) {
            return
        }

        const templateParams = {
            from_name: name,
            message: comment,
            from_email_address: emailAddress
        }

        setIsSending(true)
        send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_TEMPLATE_ID,
            templateParams,
            { publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY }
        ).then((response) => {
            setIsSending(false)

            setEmailAddress("")
            setComment("")
            setName("")

            Notify.success(`(${response.text}) Your connection request has been sent successfully.`)
        }, (error) => {
            setIsSending(false)
            Notify.error(error)
        })
    }

    const buildLeftView = () => {
        return (
            <Column
                mainAxisSize={isMobile ? "min" : "max"}
                crossAxisSize={!isMobile ? "min" : "max"}
                gap="5px"
                style={{ padding: "20px" }}
            >
                <Row gap="10px" crossAxis="flex-start">
                    <Icon icon="solar:mailbox-bold-duotone" width="2em" height="2em" style={{color: Theme.primaryDark}} />
                    <Column gap="5px">
                        <Text text="Send me an email" color={Theme.primaryDark} size={20} />
                        <Text text="Let me see what you're proposing" color={Theme.hint} size={16} />
                        <SizedBox height={10} />
                        <Text text={Constants.emailAddress} color={Theme.primaryDark} size={16} />
                    </Column>
                </Row>
                {!isMobile && (<Spacer />)}
                {isMobile && (<SizedBox height={30} />)}
                <Text text="Connect with me on social media" color={Theme.primaryDark} />
                <Wrap runSpacing={5} spacing={5}>
                    {List.socialMedia.map((media, index) => (
                        <CircularIconButton
                            key={index}
                            icon={media.icon}
                            title={media.header ?? ""}
                            size={0.7}
                            backgroundColor={Theme.primaryDark}
                            color={Theme.secondary}
                            buttonStyle={{ padding: "4px" }}
                            iconStyle={{ borderRadius: "50%" }}
                            onClick={() => Navigate.openInNewTab(media.path ?? "")}
                        />
                    ))}
                </Wrap>
            </Column>
        )
    }

    const buildRightView = () => {
        return (
            <Column
                mainAxisSize={isMobile ? "min" : "max"}
                gap="10px"
                style={{
                    padding: isMobile ? "30px" : "60px",
                    borderRadius: "24px 0 0 0",
                    backgroundColor: Theme.primary,
                    overflowX: isMobile ? "hidden" : "auto"
                }}
            >
                <Text text="Want to work together? Let me know." color={Theme.secondary} size={isMobile ? 24 : 60} />
                <Text text="Tell me more about yourself and what you got in mind." color={Theme.hover} size={isMobile ? 16 : 24} />
                <SizedBox height={20} />
                <Field
                    needLabel
                    label="Your name"
                    placeHolder="Enter your full name"
                    value={name}
                    color={Theme.secondary}
                    labelColor={Theme.hint}
                    onChange={v => setName(v)}
                />
                <Field
                    needLabel
                    label="Email Address where I can contact you"
                    placeHolder="Enter your email address"
                    value={emailAddress}
                    color={Theme.secondary}
                    labelColor={Theme.hint}
                    onChange={v => setEmailAddress(v)}
                />
                <TextAreaField
                    needLabel
                    label="Anything you would like us to know"
                    value={comment}
                    needSpacer={false}
                    color={Theme.secondary}
                    inputStyle={{ fontSize: "16px" }}
                    labelColor={Theme.hint}
                    placeHolder="Let your voice be heard and your problem solved"
                    onChange={v => setComment(v)}
                />
                <Row mainAxis="flex-end">
                    <Text
                        text={`${comment.length}/${minCommentLength}`}
                        color={comment.length >= minCommentLength ? Theme.success : Theme.hint}
                        size={14}
                    />
                </Row>
                <SizedBox height={30} />
                <ActionButton
                    padding="10px 36px"
                    backgroundColor={Theme.secondary}
                    fontSize={14}
                    onClick={sendConnect}
                    useLoader={isSending}
                    state={isSending}
                    title="Let's get started"
                />
            </Column>
        )
    }

    return (
        <React.Fragment>
            <Title title="Contact" description="Send me a quick one" />
            {!isMobile && (
                <Container height="100vh">
                    <Row gap="60px" crossAxisSize="max">
                        {buildLeftView()}
                        {buildRightView()}
                    </Row>
                </Container>
            )}
            {isMobile && (
                <Column gap="20px">
                    {buildRightView()}
                    {buildLeftView()}
                </Column>
            )}
        </React.Fragment>
    )
}