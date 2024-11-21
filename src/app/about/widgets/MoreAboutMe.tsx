import React from "react";
import { Text } from "../../../components/base/Text";
import { Container } from "../../../components/base/Container";
import { Column } from "../../../components/base/Column";
import { Wrap } from "../../../components/base/Wrap";
import { Theme } from "../../../configuration/theme/Theme";
import { Utility } from "../../../utilities/Utility";

interface ActivePageItem {
    header: string;
    comments: {
        comment: string[]
    }[]
}

const MoreAboutMe: React.FC = () => {
    const pages: ActivePageItem[] = [
        {
            header: "My Journey",
            comments: [
                {
                    comment: [
                        "As a seasoned software engineer and entrepreneur, I’ve had the privilege of leading teams and businesses toward innovation.",
                        "From creating scalable systems to managing cross-functional teams, my career has been a tapestry of challenges and achievements.",
                        "I've worked on groundbreaking projects that required combining technical expertise with creative problem-solving.",
                        "Over the years, I've mentored numerous developers, helping them unlock their potential and contribute meaningfully to the tech industry.",
                        "My journey is fueled by a passion for building solutions that make people's lives easier, whether through code, leadership, or strategy."
                    ]
                },
                {
                    comment: [
                        "Each role I’ve taken on has given me invaluable insights into the ever-evolving world of technology.",
                        "My experience spans multiple domains, including software development, product management, and team leadership.",
                        "Beyond technical work, I've contributed to creating inclusive workplace cultures that empower individuals to excel.",
                        "I believe in the power of collaboration, where diverse ideas converge to drive innovation.",
                        "Ultimately, my journey is about growth—personal, professional, and communal—driven by the belief that technology can change lives."
                    ]
                }
            ]
        },
        {
            header: "Beyond Work",
            comments: [
                {
                    comment: [
                        "When I’m not working or indulging in music, I enjoy sharing insights about entrepreneurship, technology, and personal growth.",
                        "Teaching and mentoring are integral to my life, allowing me to give back to the community and nurture the next generation of leaders.",
                        "I often write about my experiences, aiming to inspire others to embrace challenges and discover their potential.",
                        "Whether it's an article about overcoming failure or a tutorial on new technologies, my goal is to spark curiosity and resilience."
                    ]
                },
                {
                    comment: [
                        "My love for music adds rhythm to my life, offering a creative outlet that complements my technical pursuits.",
                        "I’m also an advocate for mental health and work-life balance, encouraging others to find harmony in their lives.",
                        "Exploring nature and traveling are ways I reconnect with the world, finding inspiration in diverse cultures and landscapes.",
                        "I deeply value meaningful conversations, where ideas and perspectives can flow freely and enrich our understanding.",
                        "Community building is another passion of mine, as I strive to create environments where collaboration and support thrive.",
                        "Ultimately, my life beyond work is about connection—connecting with myself, others, and the world around me."
                    ]
                }
            ]
        }
    ];

    const [activeIndex, setActiveIndex] = React.useState(0);
    const duration = 30000;
    const [progress, setProgress] = React.useState(0);
    const [paused, setPaused] = React.useState(false);

    React.useEffect(() => {
        if (paused) return; // Skip progress updates if paused

        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    setActiveIndex((prevIndex) => (prevIndex + 1) % pages.length);
                    return 0; // Reset progress and move to the next page
                }
                return prevProgress + 100 / (duration / 100);
            });
        }, 100);

        return () => clearInterval(progressInterval);
    }, [paused, duration, pages.length]);

    const activePage = pages[activeIndex];

    return (
        <Column crossAxis="center" gap="20px">
            <Wrap crossAxisAlignment="center" spacing={10} runSpacing={10}>
                {pages.map((page, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <Container
                            key={index}
                            backgroundColor={isActive ? Theme.primaryDark : Theme.hover}
                            hoverBackgroundColor={isActive ? Theme.primaryDark : Utility.lightenColor(Theme.primaryDark, 80)}
                            padding="8px"
                            borderRadius="12px"
                            onClick={() => {
                                setActiveIndex(index);
                                setProgress(0);
                            }}
                        >
                            <Text
                                text={page.header}
                                size={15}
                                color={isActive ? Theme.secondary : Theme.primaryDark}
                            />
                        </Container>
                    );
                })}
            </Wrap>
            {activePage && (
                <ActivePage page={activePage} progress={progress} setPaused={setPaused} />
            )}
        </Column>
    );
};

interface ActivePageProps {
    page: ActivePageItem;
    progress: number;
    setPaused: (paused: boolean) => void;
}

const ActivePage: React.FC<ActivePageProps> = ({ page, progress, setPaused }) => {
    return (
        <Container
            onHover={(isHovered) => setPaused(isHovered)}
            backgroundColor={Theme.hover}
            padding="0 20px 20px 20px"
            borderRadius="12px"
        >
            <Column gap="20px">
                {/* Progress Line */}
                <Container
                    borderRadius="24px"
                    style={{
                        height: "4px",
                        width: `${progress}%`,
                        backgroundColor: Theme.primaryDark,
                        transition: "width 0.1s linear"
                    }}
                />
                {page.comments.map((item, index) => (
                    <Text key={index} text={item.comment.join(" ")} size={16} color={Theme.primaryDark} />
                ))}
            </Column>
        </Container>
    );
};

export default MoreAboutMe