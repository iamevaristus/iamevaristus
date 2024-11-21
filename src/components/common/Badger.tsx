import { Badge } from "@mui/material";
import { Theme } from "../../configuration/theme/Theme";

interface BadgerProps {
    count: number;
    children?: React.ReactNode;
    backgroundColor?: string;
    color?: string;
    type?: "count" | "dot"
}

export const Badger: React.FC<BadgerProps> = ({ count, children, backgroundColor, color, type = 'count' }) => {
    const variant = type === 'count' ? 'standard' : 'dot'

    return (
        <Badge badgeContent={count} variant={variant} sx={{
            color: color || Theme.secondary,
            '& .MuiBadge-badge': {
                backgroundColor: backgroundColor || Theme.primary,
            }
        }}>
            {children}
        </Badge>
    )
}