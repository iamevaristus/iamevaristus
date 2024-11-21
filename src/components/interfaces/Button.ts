import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// ButtonView Interface
export type ButtonView = {
    icon?: IconDefinition | string | '';
    index?: number | 0;
    header?: string | "";
    body?: string | "";
    number?: number | 0;
    color?: string | "";
    path?: string | "";
    onClick?: () => void;
}

// ParentButtonView Interface
export type ParentButtonView = {
    section: string;
    views: ButtonView[];
}