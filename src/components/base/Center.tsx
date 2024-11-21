import React from 'react';

interface CenterProps {
    children: React.ReactNode;
}

export const Center: React.FC<CenterProps> = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            width: '100%',
        }}>
            {children}
        </div>
    );
};
