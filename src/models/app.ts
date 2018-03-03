import {NavigationItem} from "./navigation_item";

export interface App {
    name: string;
    name_slug: string;
    onesignal_ios: string;
    onesignal_android: string;
    website_api_base_url: string;
    local_api_base_url: string;
    intro_text_1: string;
    intro_text_2: string;
    intro_text_3: string;
    intro_text_4: string;
    logo: AppImage;
    menu_header: AppImage;
    menu_bg: AppImage;
    page_bg: AppImage;
    intro_bg_1: AppImage;
    intro_bg_2: AppImage;
    intro_bg_3: AppImage;
    intro_bg_4: AppImage;
    remote_navigation: NavigationItem[];
    local_navigation: NavigationItem[];
}

export interface AppImage {
    file_original: string;
    file_size: number
    mime_type: string;
    cached_image_path: string;
}