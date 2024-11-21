import { Icon } from "@iconify/react";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";
import { SizedBox } from "../base/Flex";
import { useDesign } from "../hooks/useDesign";

interface LoadingProps {
    isLoading?: boolean;
    isVerified?: boolean;
    loading?: string;
    verified?: string;
    unverified?: string;
    color?: string;
    success?: string;
    error?: string;
    textStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    stateStyle?: React.CSSProperties;
}

/**
 * Loading component to display different states (loading, verified, unverified) with customizable styles and content.
 *
 * @typedef {Object} LoadingProps
 * @property {boolean} [isLoading=false] - Indicates if the loading state is active.
 * @property {boolean} [isVerified=false] - Indicates if the link has been verified.
 * @property {string} [loading='Verifying link...'] - Text displayed during loading.
 * @property {string} [verified='Link is verified'] - Text displayed when verification is successful.
 * @property {string} [unverified='Error while verifying link'] - Text displayed when verification fails.
 * @property {string} [color=Theme.primary] - The color used for loading state.
 * @property {string} [success=Theme.success] - The color used for the success (verified) state.
 * @property {string} [error=Theme.error] - The color used for the error (unverified) state.
 * @property {React.CSSProperties} [textStyle] - Custom CSS styles for the text.
 * @property {React.CSSProperties} [iconStyle] - Custom CSS styles for the icon.
 * @property {React.CSSProperties} [containerStyle] - Custom CSS styles for the container.
 * @property {React.CSSProperties} [stateStyle] - Custom CSS styles for the state container.
 */
export const Loading: React.FC<LoadingProps> = ({
    isLoading = false,
    isVerified = false,
    loading = 'Verifying link...',
    verified = 'Link is verified',
    unverified = 'Error while verifying link',
    color = Theme.primary,
    success = Theme.success,
    error = Theme.error,
    textStyle,
    iconStyle,
    containerStyle,
    stateStyle
}) => {
    /// DEFINITIONS
    const { isMobile } = useDesign();

    const styles = {
        container: {
            flex: '0 0 auto',
            width: '100%',
            height: '600px',
            display: 'flex',
            position: 'relative' as 'relative',
            alignItems: 'center',
            flexDirection: 'column' as 'column',
            justifyContent: 'center',
            ...containerStyle
        },
        state: {
            flex: '0 0 auto',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column' as 'column',
            justifyContent: 'center',
            ...stateStyle
        },
        icon: {
            width: isMobile ? "100px" : "150px",
            height: isMobile ? "100px" : "150px"
        },
        text: {
            fontSize: isMobile ? "14px" : '20px',
            fontStyle: 'normal' as 'normal',
            fontWeight: 700,
            color: color,
            ...textStyle
        },
    };

    const renderIcon = (): JSX.Element => {
        const icon = isVerified && !isLoading
            ? "line-md:circle-filled-to-confirm-circle-filled-transition"
            : !isVerified && !isLoading
            ? "line-md:alert-circle-twotone-loop"
            : "line-md:loading-twotone-loop";

        return (
            <Icon
                icon={icon}
                style={{
                    ...styles.icon,
                    color: isVerified && !isLoading
                        ? success
                        : !isVerified && !isLoading
                        ? error
                        : color,
                    ...iconStyle
                }}
            />
        )
    }

    return (
        <div style={styles.container}>
            {isLoading && (
                <div style={styles.state}>
                    {renderIcon()}
                    <SizedBox height={20} />
                    <span style={styles.text}>{loading}</span>
                </div>
            )}
            {isVerified && !isLoading && (
                <div style={styles.state}>
                    {renderIcon()}
                    <SizedBox height={20} />
                    <span style={styles.text}>{verified}</span>
                </div>
            )}
            {!isVerified && !isLoading && (
                <div style={styles.state}>
                    {renderIcon()}
                    <SizedBox height={20} />
                    <span style={styles.text}>{unverified}</span>
                </div>
            )}
        </div>
    );
};

interface HorizontalLoaderProps {
    isPlaying?: boolean;
    color?: string;
}

/**
 * HorizontalLoader component to display a simple animated horizontal loader with customizable color.
 *
 * @typedef {Object} HorizontalLoaderProps
 * @property {boolean} [isPlaying=true] - Determines if the animation is playing.
 * @property {string} [color='#1b1b1b'] - Background color of the loader.
 */
export const HorizontalLoader: React.FC<HorizontalLoaderProps> = ({ isPlaying = true, color = '#1b1b1b' }) => {
    return (
        <div className="loader-container">
            <div className={`loader ${isPlaying ? 'playing' : ''}`} style={{ backgroundColor: color }}></div>
            <style>
                {`
                    .loader-container {
                        width: 100%;
                        height: 4px;
                        overflow: hidden;
                        position: relative;
                    }

                    .loader {
                        width: 100px;
                        height: 2px;
                        position: absolute;
                        left: -100px;
                        top: 0;
                        bottom: 0;
                        animation: move 2s linear infinite;
                    }

                    .loader.playing {
                        animation-play-state: running;
                    }

                    .loader {
                        animation-play-state: paused;
                    }

                    @keyframes move {

                        /* 0% {
                            left: 0;
                        } */
                        0% {
                            left: -50px;
                            /* Start from outside the container */
                        }

                        10% {
                            left: 0;
                            /* Fully inside the container */
                        }

                        50% {
                            left: 90%;
                            /* calc(100% - 100px); */
                        }

                        100% {
                            left: 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};

interface BackdropLoaderProps {
    open?: boolean;
    color?: string;
    style?: React.CSSProperties
}

/**
 * BackdropLoader component displays a backdrop with a circular loader, commonly used to indicate loading states.
 *
 * @typedef {Object} BackdropLoaderProps
 * @property {boolean} [open=false] - Controls whether the loader is visible.
 * @property {string} [color="#fff"] - The color of the circular progress indicator.
 * @property {React.CSSProperties} [style] - Custom styles for the backdrop component.
 */
export const BackdropLoader: React.FC<BackdropLoaderProps> = ({ open = false, color = "#fff", style }) => {
    return (
        <Backdrop sx={{ color: color, zIndex: (theme) => theme.zIndex.drawer + 1, ...style }} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};