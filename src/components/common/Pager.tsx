import React from "react";
import { Theme } from "../../configuration/theme/Theme";

interface PagerProps<T> {
    itemsPerPage: number;
    items: T[];
    onSlice: (items: T[]) => void;
    hoveredColor?: string;
    hoveredBackgroundColor?: string;
    activeColor?: string;
    activeBackgroundColor?: string;
    inActiveColor?: string;
    inActiveBackgroundColor?: string;
    buttonStyle?: React.CSSProperties;
    activeButtonStyle?: React.CSSProperties;
    pagerStyle?: React.CSSProperties;
}

/**
 * Pager is a React functional component that handles pagination for a given list of items.
 * It allows users to navigate through pages and controls the items displayed per page.
 *
 * @template T
 *
 * @component
 *
 * @param {Object} props - The properties for the Pager component.
 * @param {number} props.itemsPerPage - The number of items to display per page.
 * @param {T[]} props.items - The array of items to paginate.
 * @param {(items: T[]) => void} props.onSlice - A callback function that is called whenever the current page changes,
 *                                               receiving the currently visible items as an argument.
 *
 * @returns {JSX.Element} A JSX element that renders pagination buttons and controls the display of items per page.
 *
 * @example
 * // Example usage of the Pager component
 * const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];
 * const handleSlice = (currentItems) => {
 *     console.log('Current Items:', currentItems);
 * };
 *
 * <Pager itemsPerPage={2} items={items} onSlice={handleSlice} />
 *
 * @example
 * // Using Pager with a complex object
 * const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, ...];
 * const handleSlice = (currentItems) => {
 *     console.log('Current Items:', currentItems);
 * };
 *
 * <Pager itemsPerPage={3} items={items} onSlice={handleSlice} />
 */
export const Pager: React.FC<PagerProps<any>> = ({
    itemsPerPage,
    items,
    onSlice,
    hoveredColor = Theme.appbarLight,
    activeColor = Theme.secondary,
    inActiveColor = Theme.primary,
    hoveredBackgroundColor = Theme.hint,
    activeBackgroundColor = Theme.primary,
    inActiveBackgroundColor = 'transparent',
    buttonStyle,
    pagerStyle,
    activeButtonStyle
}) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [hovered, setHovered] = React.useState(-1);

    React.useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
        onSlice(currentItems);
    }, [currentPage, items, itemsPerPage, onSlice]);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const isCurrent = (i: number) => currentPage === i;
    const textColor = (i: number) => hovered === i ? hoveredColor : isCurrent(i) ? activeColor : inActiveColor;
    const background = (i: number) => hovered === i ? hoveredBackgroundColor : isCurrent(i) ? activeBackgroundColor : inActiveBackgroundColor;

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            const style = isCurrent(i) && activeButtonStyle ? activeButtonStyle : buttonStyle;

            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={{
                        backgroundColor: background(i),
                        border: '1px solid #ccc',
                        color: textColor(i),
                        cursor: 'pointer',
                        margin: '0 5px',
                        padding: '5px 10px',
                        transition: 'background-color 0.3s, color 0.3s',
                        ...style
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(-1)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <>
            {totalPages > 1 && (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        margin: '20px 0',
                        ...pagerStyle
                    }}
                >
                    {renderPagination()}
                </div>
            )}
        </>
    );
}
