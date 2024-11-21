interface ExpandedProps {
    children: React.ReactNode;
    flex?: number;
}

export const Expanded: React.FC<ExpandedProps> = ({ children, flex = 1 }) => (
    <div style={{ flex }}>
        {children}
    </div>
);


interface FlexibleProps {
    children: React.ReactNode;
    flex?: number;
}

export const Flexible: React.FC<FlexibleProps> = ({ children, flex = 1 }) => (
    <div style={{ flex }}>
        {children}
    </div>
);


interface SizedBoxProps {
    width?: number;
    height?: number;
}

export const SizedBox: React.FC<SizedBoxProps> = ({ width, height }) => (
    <div style={{ width, height }} />
);

export const Spacer: React.FC = () => <div style={{ flex: 1 }} />;