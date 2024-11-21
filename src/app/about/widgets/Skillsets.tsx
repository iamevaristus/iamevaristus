import React from "react";
import { Text } from "../../../components/base/Text";
import { Container } from "../../../components/base/Container";
import { Column } from "../../../components/base/Column";
import { Row } from "../../../components/base/Row";
import { Theme } from "../../../configuration/theme/Theme";
import { useDesign } from "../../../components/hooks/useDesign";
import { Wrap } from "../../../components/base/Wrap";
import { Icon } from "@iconify/react/dist/iconify.js";

const Skillsets: React.FC = () => {
    const  { isMobile } = useDesign();

    const tabs = [
        {
            title: "Programming Skills",
            color: "#002DA9FF",
            list: [
                {
                    header: "Languages",
                    items: [
                        {
                            subject: "JavaScript",
                            image: "logos:javascript",
                            icon: true
                        },
                        {
                            subject: "Java",
                            image: "vscode-icons:file-type-java",
                            icon: true
                        },
                        {
                            subject: "Dart",
                            image: "simple-icons:dart",
                            icon: true
                        },
                        {
                            subject: "Python",
                            image: "logos:python",
                            icon: true
                        },
                        {
                            subject: "HTML",
                            image: "uim:html5",
                            icon: true
                        },
                        {
                            subject: "CSS",
                            image: "vscode-icons:file-type-css",
                            icon: true
                        },
                        {
                            subject: "TypeScript",
                            image: "logos:typescript-icon",
                            icon: true
                        },
                        {
                            subject: "Kotlin",
                            image: "logos:kotlin",
                            icon: true
                        },
                        {
                            subject: "SQL",
                            image: "mdi:database",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Frameworks & Libraries",
                    items: [
                        {
                            subject: "ReactJS",
                            image: "ion:logo-react",
                            icon: true
                        },
                        {
                            subject: "Flutter",
                            image: "material-symbols-light:flutter",
                            icon: true
                        },
                        {
                            subject: "Node.js",
                            image: "logos:nodejs",
                            icon: true
                        },
                        {
                            subject: "Express.js",
                            image: "simple-icons:express",
                            icon: true
                        },
                        {
                            subject: "Spring Boot",
                            image: "logos:spring-icon",
                            icon: true
                        },
                        {
                            subject: "Redux",
                            image: "logos:redux",
                            icon: true
                        },
                        {
                            subject: "Jest",
                            image: "logos:jest",
                            icon: true
                        },
                        {
                            subject: "Tailwind CSS",
                            image: "logos:tailwindcss-icon",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Tools & Platforms",
                    items: [
                        {
                            subject: "Git",
                            image: "mdi:git",
                            icon: true
                        },
                        {
                            subject: "GitHub",
                            image: "mdi:github",
                            icon: true
                        },
                        {
                            subject: "Docker",
                            image: "logos:docker-icon",
                            icon: true
                        },
                        {
                            subject: "Kubernetes",
                            image: "logos:kubernetes",
                            icon: true
                        },
                        {
                            subject: "Firebase",
                            image: "logos:firebase",
                            icon: true
                        },
                        {
                            subject: "Supabase",
                            image: "logos:supabase-icon",
                            icon: true
                        },
                        {
                            subject: "PostgreSQL",
                            image: "logos:postgresql",
                            icon: true
                        },
                        {
                            subject: "MySQL",
                            image: "logos:mysql",
                            icon: true
                        },
                        {
                            subject: "MongoDB",
                            image: "vscode-icons:file-type-mongo",
                            icon: true
                        },
                        {
                            subject: "Google Cloud",
                            image: "logos:google-cloud",
                            icon: true
                        },
                        {
                            subject: "AWS",
                            image: "logos:aws",
                            icon: true
                        },
                        {
                            subject: "Azure",
                            image: "logos:microsoft-azure",
                            icon: true
                        }
                    ]
                }
            ]
        },
        {
            title: "Music Skills",
            color: "#1F00A9FF",
            list: [
                {
                    header: "Composing & Arranging",
                    items: [
                        {
                            subject: "Choir Arrangements",
                            image: "mdi:music",
                            icon: true
                        },
                        {
                            subject: "Orchestral Compositions",
                            image: "mdi:orchestra",
                            icon: true
                        },
                        {
                            subject: "Film Scoring",
                            image: "mdi:movie-music-outline",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Instruments",
                    items: [
                        {
                            subject: "Piano",
                            image: "mdi:piano",
                            icon: true
                        },
                        {
                            subject: "Violin",
                            image: "mdi:violin",
                            icon: true
                        },
                        {
                            subject: "Guitar",
                            image: "mdi:guitar-acoustic",
                            icon: true
                        },
                        {
                            subject: "Drums",
                            image: "mdi:drum",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Conducting",
                    items: [
                        {
                            subject: "Choir Conducting",
                            image: "mdi:music-note",
                            icon: true
                        },
                        {
                            subject: "Orchestra Conducting",
                            image: "mdi:conductor",
                            icon: true
                        },
                        {
                            subject: "Band Conducting",
                            image: "mdi:trumpet",
                            icon: true
                        }
                    ]
                }
            ]
        },
        {
            title: "Soft Skills",
            color: "#0038A9FF",
            list: [
                {
                    header: "Leadership",
                    items: [
                        {
                            subject: "Team Leadership",
                            image: "mdi:account-group",
                            icon: true
                        },
                        {
                            subject: "Project Management",
                            image: "mdi:clipboard-check",
                            icon: true
                        },
                        {
                            subject: "Mentorship",
                            image: "mdi:teach",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Communication",
                    items: [
                        {
                            subject: "Public Speaking",
                            image: "mdi:microphone",
                            icon: true
                        },
                        {
                            subject: "Technical Writing",
                            image: "mdi:pencil",
                            icon: true
                        },
                        {
                            subject: "Conflict Resolution",
                            image: "mdi:handshake",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Creativity & Problem Solving",
                    items: [
                        {
                            subject: "Innovative Thinking",
                            image: "mdi:lightbulb",
                            icon: true
                        },
                        {
                            subject: "Critical Analysis",
                            image: "mdi:magnify",
                            icon: true
                        },
                        {
                            subject: "Design Thinking",
                            image: "mdi:palette",
                            icon: true
                        }
                    ]
                }
            ]
        },
        {
            title: "Interests",
            color: "#1400A9FF",
            list: [
                {
                    header: "Sports",
                    items: [
                        {
                            subject: "Basketball",
                            image: "mdi:basketball",
                            icon: true
                        },
                        {
                            subject: "Table Tennis",
                            image: "mdi:table-tennis",
                            icon: true
                        },
                        {
                            subject: "Chess",
                            image: "mdi:chess-king",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Entertainment",
                    items: [
                        {
                            subject: "Movies",
                            image: "mdi:movie-open",
                            icon: true
                        },
                        {
                            subject: "TV Shows",
                            image: "mdi:television-classic",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Technology",
                    items: [
                        {
                            subject: "AI & Machine Learning",
                            image: "mdi:robot",
                            icon: true
                        },
                        {
                            subject: "Blockchain",
                            image: "mdi:blockchain",
                            icon: true
                        },
                        {
                            subject: "IoT (Internet of Things)",
                            image: "mdi:devices",
                            icon: true
                        }
                    ]
                },
                {
                    header: "Personal Growth",
                    items: [
                        {
                            subject: "Reading",
                            image: "mdi:book-open",
                            icon: true
                        },
                        {
                            subject: "Writing Blogs",
                            image: "mdi:blog",
                            icon: true
                        },
                        {
                            subject: "Traveling",
                            image: "mdi:airplane",
                            icon: true
                        }
                    ]
                }
            ]
        }
    ];

    const [active, setActive] = React.useState(tabs[0].title)

    const activeTab = tabs.find(tab => tab.title.toLowerCase() === active.toLowerCase())

    return (
        <Column>
            <Text
                text="Explore_____"
                size={isMobile ? 48 : 54}
                weight="bold"
                color={Theme.primaryDark}
                style={{ letterSpacing: "-1px" }}
            />
            <Row
                gap="12px"
                style={{
                    overflowY: "auto",
                    backgroundColor: "#07034D",
                    padding: "10px",
                    width: isMobile ? "90%" : "50%",
                    borderRadius: "0 24px 24px 0",
                    whiteSpace: "nowrap"
                }}
            >
                {tabs.map((tab, index) => {
                    const isActive = tab.title.toLowerCase() === active.toLowerCase()

                    return (
                        <Container
                            key={index}
                            onClick={() => setActive(tab.title)}
                            padding="8px"
                            borderRadius="12px"
                            backgroundColor={isActive ? tab.color : "transparent"}
                            hoverBackgroundColor={isActive ? tab.color : Theme.hover}
                            style={{ transition: "all 0.6s", flexShrink: 0, }}
                        >
                            <Text text={tab.title} color={isActive ? Theme.secondary : Theme.hint} />
                        </Container>
                    )
                })}
            </Row>
            {activeTab && (
                <Column gap="40px" style={{padding: "0 0 24px 18px"}}>
                    <Container padding="2px" borderRadius="12px" backgroundColor={activeTab.color} />
                    {activeTab.list.map((item, index) => (
                        <Column gap="12px" key={index} style={{padding: "0 18px 0 0"}}>
                            <Text text={item.header} size={18} color={Theme.primaryDark} />
                            <Wrap runSpacing={20} spacing={30} crossAxisAlignment="center">
                                {item.items.map((subject, i) => (
                                    <Row mainAxisSize="min" key={i} gap="15px">
                                        {subject.icon && (<Icon icon={subject.image} height="1.6em" width="1.6em" />)}
                                        <Container padding="4px 0 0 0">
                                            <Text text={subject.subject} size={16} color={Theme.primaryDark} />
                                        </Container>
                                    </Row>
                                ))}
                            </Wrap>
                        </Column>
                    ))}
                </Column>
            )}
        </Column>
    )
}

export default Skillsets;