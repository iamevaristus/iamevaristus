import { Icon } from "@iconify/react";
import { Theme } from "../../configuration/theme/Theme";

export interface RatingIconProps {
    rating: number;
    size?: number;
    color?: string;
    emptyIcon?: string;
    fullIcon?: string;
    halfIcon?: string;
    fullIconCount?: number;
    halfIconCount?: number;
}

/**
 * RatingIcon is a React functional component that displays a rating using customizable icons.
 * The component allows for specifying the size, color, and the icons for empty, full, and half ratings.
 *
 * @component
 *
 * @param {Object} props - The properties for the RatingIcon component.
 * @param {number} props.rating - The rating value, which determines which icon to display.
 *                               Should be a number where:
 *                               - Full icon is displayed for values >= fullIconCount.
 *                               - Half icon is displayed for values between halfIconCount and fullIconCount.
 *                               - Empty icon is displayed for values < halfIconCount.
 * @param {number} [props.size=1.2] - The size of the icon, defined in `em` units. Default is 1.2.
 * @param {string} [props.color] - The color of the icon. If not provided, defaults to Theme.pending color.
 * @param {string} [props.emptyIcon] - The icon to be displayed when the rating is empty.
 *                                     Defaults to "ic:outline-star-outline" if not provided.
 * @param {string} [props.fullIcon] - The icon to be displayed when the rating is full.
 *                                     Defaults to "ic:outline-star" if not provided.
 * @param {string} [props.halfIcon] - The icon to be displayed for a half rating.
 *                                     Defaults to "ic:sharp-star-half" if not provided.
 * @param {number} [props.fullIconCount=4] - The threshold value for a full rating icon. Default is 4.
 * @param {number} [props.halfIconCount=2.5] - The threshold value for a half rating icon. Default is 2.5.
 *
 * @returns {JSX.Element} A JSX element that renders the appropriate rating icon based on the provided rating value.
 *
 * @example
 * // Renders a full star icon for a rating of 4 or more
 * <RatingIcon rating={4} />
 *
 * @example
 * // Renders a half star icon for a rating of 2.5
 * <RatingIcon rating={2.5} size={1.5} color="gold" />
 *
 * @example
 * // Renders an empty star icon for a rating of less than 2.5
 * <RatingIcon rating={2} />
 */
export const RatingIcon: React.FC<RatingIconProps> = ({
    rating,
    size = 1.2,
    color,
    emptyIcon,
    fullIcon,
    halfIcon,
    fullIconCount = 4,
    halfIconCount = 2.5
}) => {
    const eIcon = emptyIcon ?? "ic:outline-star-outline";
    const hIcon = halfIcon ?? "ic:sharp-star-half";
    const fIcon = fullIcon ?? "ic:outline-star";

    return (
        <Icon
            icon={rating >= fullIconCount ? fIcon : rating >= halfIconCount ? hIcon : eIcon}
            width={`${size}em`}
            height={`${size}em`}
            style={{ color: color || Theme.pending }}
        />
    )
}