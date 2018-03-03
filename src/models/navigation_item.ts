export interface NavigationItem {
    name: string;
    icon: string;
    url: string;
    page: string;
    call_function: string;
    is_protected: boolean;
    is_hidden_when_logged_in: boolean;
    is_visible_for_at_home: boolean;
    items: NavigationItem[];
}

// export interface NavigationParameter {
//     title: string;
//     url: string;
//     type: string;
//     subitem: boolean;
//     isProtected: boolean;
//     showWhenLoggedIn: boolean;
//     force: boolean;
// }