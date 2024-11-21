import React from "react";
import { Column } from "../../components/base/Column";
import TopNavigation from "./TopNavigation";
import Routing from "../../configuration/routes/Routing";
import { Outlet, useLocation } from "react-router-dom";
import { HorizontalLoader } from "../../components/common/Loading";
import { Theme } from "../../configuration/theme/Theme";
import Footer from "./Footer";

const Layout: React.FC = () => {
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                setScrollPosition(scrollContainerRef.current.scrollTop);
            }
        };

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const scroll = Math.min(scrollPosition / 100, 10);

    const location = useLocation()
    const currentPath = location.pathname;
    const current = Routing.instance.get(currentPath);

    const render = (): JSX.Element => {
        if(current) {
            return (<Outlet />)
        } else {
            return (<HorizontalLoader isPlaying color={Theme.primary} />)
        }
    }

    return (
        <Column
            mainAxisSize="max"
            mainAxis="flex-start"
            crossAxis="flex-start"
            style={{
                overflow: "hidden",
                height: "100vh",
            }}
        >
            <TopNavigation changeColor={scroll > 1 || (current !== undefined && current === Routing.instance.about)} />
            <div
                ref={scrollContainerRef}
                style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    display: 'flex',
                    flexDirection: 'column',
                    width: "100%"
                }}
            >
                {render()}
                <Footer />
            </div>
        </Column>
    )
}

export default Layout