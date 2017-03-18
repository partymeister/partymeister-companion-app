export interface NavigationItem {
    title: string;
    icon: string;
    "protected": boolean;
    "showWhenLoggedIn": boolean;
    "container": string;
    "callFunction": string;
    "parameters": NavigationParameter;
    "items": NavigationItem[];
}

export interface NavigationParameter {
    title: string;
    url: string;
    type: string;
    subitem: boolean;
    isProtected: boolean;
    showWhenLoggedIn: boolean;
    force: boolean;
}