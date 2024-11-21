import { Icon } from "@iconify/react";
import { Theme } from "../../configuration/theme/Theme";

interface ArrowButtonProps {
    isUp: boolean;
    onClick: () => void;
    color?: string;
    size?: number;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
    isUp = false, onClick, color = Theme.secondary, size = 1.2
}) => {
    return (
        <Icon
            icon="solar:alt-arrow-up-broken"
            width={`${size}em`}
            height={`${size}em`}
            style={{
                color: color,
                transform: isUp ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: '0.5s',
                cursor: 'pointer',
            }}
            onClick={onClick}
        />
    )
}