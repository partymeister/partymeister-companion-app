export interface NavigationItem {
    name: string;
    icon: string;
    url: string;
    page: string;
    call_function: string;
    is_default: boolean;
    is_protected: boolean;
    is_hidden_when_logged_in: boolean;
    is_visible_for_at_home: boolean;
    items: NavigationItem[];
}
