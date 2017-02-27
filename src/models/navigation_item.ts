export interface NavigationItem {
    title: string;
    icon: string;
    "protected": boolean;
    "showWhenLoggedIn": boolean;
    "container": string;
    "parameters": NavigationParameter;
    "items": NavigationItem[];
}

export interface NavigationParameter {
    title: string;
    url: string;
    type: string;
    subitem: boolean;
}