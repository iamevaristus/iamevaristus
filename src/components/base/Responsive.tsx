import React from 'react';
import { useDesign } from '../hooks/useDesign';

interface ResponsiveProps {
    children?: React.ReactNode;
    phone?: React.ReactNode;
    tablet?: React.ReactNode;
    desktop?: React.ReactNode;
    builder?: () => React.ReactNode;
}

export const Responsive: React.FC<ResponsiveProps> = ({
    phone,
    tablet,
    desktop,
    children,
    builder,
}) => {
    const { isDesktop, isTablet } = useDesign();

    // Custom rendering using the builder function if provided
    if (builder) {
        const customWidget = builder();
        if (customWidget) return <>{customWidget}</>;
    }

    // Check for device size and render accordingly
    if (isDesktop) {
        // Desktop
        return desktop || children || <></>;
    } else if (isTablet) {
        // Tablet
        return tablet || desktop || children || <></>;
    } else {
        // Phone
        return phone || children || <></>;
    }
};