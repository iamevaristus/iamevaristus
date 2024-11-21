import { Icon } from "@iconify/react";
import React from "react";
import { Theme } from "../../configuration/theme/Theme";

/**
 * Props for the SearchBar component.
 *
 * @template T - Type of items in the search list.
 * @property {string} [placeholder] - Placeholder text for the search input.
 * @property {T[]} list - The list of items to search through.
 * @property {(results: T[]) => void} onSearch - Callback function to handle the search results.
 * @property {boolean} [showButton] - Whether to display a search button.
 * @property {boolean} [showLoading] - Whether to show a loading indicator.
 * @property {string} [loadingIcon] - Icon to display while loading.
 * @property {boolean} [needPadding] - Whether to add padding around the search bar.
 * @property {string} [backgroundColor] - Background color of the search bar.
 * @property {string} [textFocusedColor] - Text color when the input is focused.
 * @property {string} [textUnfocusedColor] - Text color when the input is unfocused.
 * @property {string} [textColor] - Default text color.
 * @property {string} [buttonBackgroundColor] - Background color for the search button.
 * @property {string} [buttonTextColor] - Text color for the button.
 * @property {string} [buttonText] - Text to display on the button.
 * @property {string[] | {}} [searchProperties] - Properties to search on each item.
 * @property {React.CSSProperties} [parentStyle] - Styles for the parent container.
 * @property {React.CSSProperties} [boxStyle] - Styles for the box containing the search input and button.
 * @property {React.CSSProperties} [searchInputStyle] - Styles for the search input.
 * @property {React.CSSProperties} [searchInputAndIconStyle] - Styles for the container of the input and icon.
 * @property {React.CSSProperties} [iconStyle] - Styles for the search icon.
 * @property {React.CSSProperties} [inputStyle] - Styles for the input element.
 * @property {React.CSSProperties} [buttonStyle] - Styles for the button.
 * @property {React.CSSProperties} [buttonTextStyle] - Styles for the button text.
 * @property {React.CSSProperties} [loadingStyle] - Styles for the loading icon.
 */
interface SearchBarProps<T> {
    placeholder?: string;
    list?: T[];
    onSearch?: (results: T[]) => void;
    onQuerySearch?: (query: string) => void;
    icon?: string;
    showFocusedBorder?: boolean;
    showButton?: boolean;
    showLoading?: boolean;
    loadingIcon?: string;
    needPadding?: boolean;
    backgroundColor?: string;
    textFocusedColor?: string;
    textUnfocusedColor?: string;
    textColor?: string;
    buttonBackgroundColor?: string;
    buttonTextColor?: string;
    buttonText?: string;
    searchProperties?: string[] | {};
    parentStyle?: React.CSSProperties;
    boxStyle?: React.CSSProperties;
    searchInputStyle?: React.CSSProperties;
    searchInputAndIconStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    buttonTextStyle?: React.CSSProperties;
    loadingStyle?: React.CSSProperties;
    onFocused?: (focus: boolean) => void;
}

/**
 * A component that renders a search bar with optional search button and loading indicator.
 *
 * @template T - Type of items in the search list.
 * @param {SearchBarProps<T>} props - The props for the component.
 * @returns {JSX.Element} The rendered search bar component.
 */
export const SearchBar = <T extends {}>({
    placeholder = "Search with keywords",
    list,
    onSearch,
    onQuerySearch,
    icon = "lets-icons:search-duotone",
    showFocusedBorder = true,
    showButton = false,
    needPadding = true,
    backgroundColor = Theme.appbarDark,
    textFocusedColor = Theme.primary,
    textUnfocusedColor = Theme.hint,
    textColor = Theme.primary,
    buttonBackgroundColor = Theme.primary,
    buttonText = "Search",
    buttonTextColor = Theme.secondary,
    searchProperties,
    parentStyle,
    boxStyle,
    searchInputStyle,
    searchInputAndIconStyle,
    iconStyle,
    inputStyle,
    buttonStyle,
    buttonTextStyle,
    loadingIcon = "svg-spinners:blocks-shuffle-2",
    showLoading = true,
    loadingStyle,
    onFocused
}: SearchBarProps<T>) => {
    const searchRef = React.useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [query, setQuery] = React.useState<string>('');
    const [isSearching, setIsSearching] = React.useState<boolean>(false)
    const [searchList, setSearchList] = React.useState<string[]>([]);

    /**
     * Extracts refresh token data recursively from a list of tokens.
     *
     * @param {any[]} tokens - The list of tokens to process.
     * @param {string[]} result - The array where extracted properties will be pushed.
     */
    const extractRefreshTokenData = React.useCallback((tokens: any[], result: string[]) => {
        tokens.forEach((token) => {
            if (token && typeof token === 'object') {
                ['id', 'token', 'updatedAt', 'createdAt'].forEach((key) => {
                    if (key in token) {
                        processProperty(token[key], result);
                    }
                });

                if ('children' in token && Array.isArray(token.children)) {
                    extractRefreshTokenData(token.children, result);
                }
            }
        });
    }, []);

    /**
     * Processes a property and pushes its string representation to the results.
     *
     * @param {any} property - The property to process.
     * @param {string[]} result - The array where processed properties will be pushed.
     */
    const processProperty = (property: any, result: string[]) => {
        if (property != null && typeof property !== 'undefined') {
            if (typeof property !== 'string') {
                property = String(property);
            }
            result.push(property.toLowerCase());
        }
    };

    React.useEffect(() => {
        if (list && list.length > 0) {
            const mappedList = list.flatMap((item) => {
                let result: string[] = [];
                if (item != null) {
                    if (typeof item === 'string') {
                        result.push(item.toLowerCase());
                    } else if (typeof item === 'object') {
                        const processProperties = (keys: string[], obj: any) => {
                            keys.forEach((key) => {
                                if (key in obj) {
                                    processProperty(obj[key], result);
                                }
                            });
                        };

                        processProperties(Object.keys(item), item);

                        processProperties([
                            'name', 'scope', 'value', 'emailAddress', 'position', 'dialCode', 'code',
                            'country', 'date', 'createdAt', 'updatedAt', 'team', 'message', 'label',
                            'sentAt', 'event', 'eventId', 'opsv', 'ops', 'method', 'level', 'host',
                            'ipAddress', 'device', 'id', 'firstName', 'lastName', 'empId'
                        ], item);

                        ['reports', 'leads', 'permissions', 'scopes', 'members', 'events', 'groups', 'invoices', 'refreshTokens'].forEach((key) => {
                            if (key in item && Array.isArray((item as any)[key])) {
                                const keyList = (item as any)[key] as any[];
                                keyList.forEach((element: any) => {
                                    if (element && typeof element === 'object') {
                                        processProperties(Object.keys(element), element);
                                        if (key === 'refreshTokens') {
                                            extractRefreshTokenData([element], result);
                                        }
                                    }
                                });
                            }
                        });


                        ['opened', 'pending', 'waiting'].forEach((status) => {
                            if (status in item && typeof status === 'object') {
                                processProperties(['name', 'adminAssigned'], item[status]);
                            }
                        });

                        if ('groups' in item && Array.isArray(item.groups)) {
                            item.groups.forEach((group: any) => {
                                if (group && typeof group === 'object') {
                                    processProperties(['name', 'emailAddress', 'id', 'label', 'createdAt', 'updatedAt', 'amount', 'status', 'type', 'link'], group);

                                    if ('complaints' in group && Array.isArray(group.complaints)) {
                                        group.complaints.forEach((complaint: any) => {
                                            if (complaint && typeof complaint === 'object') {
                                                processProperties(['id', 'status', 'complaint'], complaint);
                                            }
                                        });
                                    }

                                    ['caller', 'called', 'user', 'provider'].forEach((prop) => {
                                        if (prop in group && typeof prop === 'object') {
                                            processProperties(['name', 'category', 'id'], group[prop]);
                                        }
                                    });
                                }
                            });
                        }

                        ['user', 'provider', 'creator', 'roommate', 'guest', "state"].forEach((prop) => {
                            if (prop in item && typeof prop === 'object') {
                                processProperties(['name', 'category', 'role', 'id'], item[prop]);
                            }
                        });

                        if ('guests' in item && Array.isArray(item.guests)) {
                            item.guests.forEach((guest: any) => {
                                if (guest && typeof guest === 'object') {
                                    processProperties(['name', 'category', 'role', 'id', 'firstName', 'lastName', 'emailAddress'], guest);
                                }
                            });
                        }

                        if ('admins' in item && Array.isArray(item.admins)) {
                            item.admins.forEach((admin: any) => {
                                if (admin && typeof admin === 'object') {
                                    processProperties(['name', 'category', 'role', 'id', 'empId', 'firstName', 'lastName', 'emailAddress'], admin);
                                }
                            });
                        }

                        if ('states' in item && Array.isArray(item.states)) {
                            item.states.forEach((state: any) => {
                                if (state && typeof state === 'object') {
                                    processProperties(['name', 'category', 'role', 'id', 'state'], state);
                                }
                            });
                        }

                        if(searchProperties) {
                            if(Array.isArray(searchProperties)) {
                                processProperties(searchProperties, item);
                            } else {
                                processProperties(Object.keys(searchProperties), item);
                            }
                        }
                    }
                }
                return result.join(' '); // Join multiple fields into a single string for easy searching
            });
            setSearchList(mappedList);
        }
    }, [list, extractRefreshTokenData]);

    const search = React.useCallback((query: string) => {
        if (query === null || query === '') {
            // If the query is empty, return the entire original list
            if(onSearch && list) {
                onSearch(list);
            }
        } else {
            if(list) {
                setIsSearching(true)
                // Filter the original list based on matches found in the search list
                const filteredList = list.filter((_item, index) =>
                    searchList[index].includes(query.toLowerCase())
                );

                setIsSearching(false)
                if(onSearch) {
                    onSearch(filteredList);
                }
            }
        }
    }, [list, onSearch, searchList]);

    React.useEffect(() => {
        if (!showButton || !onQuerySearch) {
            search(query);
        }
    }, [query, showButton, search, onQuerySearch]);

    const handleFocus = () => {
        setIsFocused(true)

        if(onFocused) {
            onFocused(true)
        }
    }

    const handleBlur = () => {
        setIsFocused(false)

        if(onFocused) {
            onFocused(false)
        }
    }

    const bar: React.CSSProperties = {
        marginTop: "1rem",
        width: "100%",
        position: "relative",
        ...parentStyle
    }

    const box: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "50px",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0rem 0rem 0rem 1rem",
        borderRadius: "0.2rem",
        position: "relative",
        ...boxStyle
    }

    const searchInput: React.CSSProperties = {
        width: "100%",
        padding: "0rem 1rem 0rem 0rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        ...searchInputStyle
    }

    const searchInputAndIcon: React.CSSProperties = {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        ...searchInputAndIconStyle
    }

    const button: React.CSSProperties = {
        backgroundColor: Theme.primary,
        borderRadius: "0rem 0.2rem 0.2rem 0rem",
        cursor: "pointer",
        height: "100%",
        marginTop: "0rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px",
        ...buttonStyle
    }

    const input: React.CSSProperties = {
        width: "100%",
        backgroundColor: "#eeeeee",
        padding: "0rem 1rem",
        textAlign: "left",
        alignItems: "center",
        fontSize: "16px",
        border: "0",
        ...inputStyle
    }

    return (
        <div ref={searchRef} style={{ padding: needPadding ? "0 20px" : undefined, ...bar }}>
            <div style={{
                backgroundColor: backgroundColor,
                border: isFocused && showFocusedBorder ? `2px solid ${textFocusedColor}` : `1px solid ${textUnfocusedColor}`,
                ...box
            }}>
                <div style={{...searchInput}}>
                    <div style={{...searchInputAndIcon}}>
                        <Icon
                            icon={icon}
                            width="25px"
                            height="25px"
                            style={{ color: textColor, ...iconStyle }}
                        />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder={placeholder}
                            onChange={e => {
                                if(onSearch && list) {
                                    setQuery(e.target.value)
                                }

                                if(onQuerySearch) {
                                    setQuery(e.target.value)
                                    onQuerySearch(e.target.value)
                                }
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={query}
                            style={{ color: textColor, backgroundColor: backgroundColor, ...input, }}
                        />
                        <style>{`input:focus {outline: none}`}</style>
                    </div>
                </div>
                {showButton && (
                    <div className="searchBtn" onClick={() => search(query)} style={{ backgroundColor: buttonBackgroundColor, ...button }}>
                        {(showLoading && isSearching)
                            ? (<Icon icon={loadingIcon} width="25px" height="25px" style={{ color: textColor, ...loadingStyle }} />)
                            : (<span style={{ color: buttonTextColor, ...buttonTextStyle }}>{buttonText}</span>)
                        }
                    </div>
                )}
            </div>
        </div>
    );
}