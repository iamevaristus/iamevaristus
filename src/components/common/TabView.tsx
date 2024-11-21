import { Box, Tab, Tabs } from "@mui/material";
import React, { ReactNode } from "react";
import { Theme } from "../../configuration/theme/Theme";
interface TabViewInterface {
    tabs: string[];
    pages: JSX.Element[] | React.FC[];
    onTabChange?: (tab: string) => void;
    showDivider?: boolean;
    tabBodyColor?: string;
    bodyColor?: string;
    dividerColor?: string;
    indicatorColor?: string;
}

export const TabView: React.FC<TabViewInterface> = ({
    tabs,
    pages,
    onTabChange,
    showDivider = false,
    tabBodyColor = Theme.primaryDark,
    bodyColor = Theme.secondary,
    dividerColor = Theme.hint,
    indicatorColor = Theme.primary
}) => {
    // Assert that the lengths of tabs and pages match
    if (tabs.length !== pages.length) {
        throw new Error("The length of tabs and pages must match.");
    }

    const [tabValue, setTabValue] = React.useState(tabs[0]);
    const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
        if (onTabChange) onTabChange(tabValue)
    };

    const tabSx = {
        '& .MuiTabs-indicator': {
            backgroundColor: indicatorColor,
        },
        '& .MuiButtonBase-root.MuiTab-root': {
            color: dividerColor,
            transition: 'color 0.2s ease-in-out',
            textTransform: "none",
            '&:hover': {
                color: dividerColor,
            },
            '&.Mui-selected': {
                color: Theme.primary,
            },
        },
    };

    const renderPage = (): ReactNode => {
        const currentIndex = tabs.indexOf(tabValue);
        return <>{pages[currentIndex]}</>;
    }

    return (
        <Box sx={{ bgcolor: bodyColor, width: '100%', }}>
            <Box sx={{ bgcolor: tabBodyColor, width: '100%', borderBottom: showDivider ? `2px solid ${dividerColor}` : "none" }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="light tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={tabSx}
                >{tabs.map((tab, key) => {
                    return (<Tab value={tab} label={tab} key={key} />)
                })}</Tabs>
            </Box>
            {renderPage()}
        </Box>
    )
}