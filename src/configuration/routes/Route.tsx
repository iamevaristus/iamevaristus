export interface RouteParams extends Record<string, string | undefined> {
    slug?: string;
    name?: string;
    scope?: string;
    invite?: string;
    emailAddress? : string;
    token?: string;
    link?: string;
}

export interface RouteInterface {
    path: string;
    pathView?: (params: RouteParams) => string;
    page: JSX.Element;
    children?: RouteInterface[];
}