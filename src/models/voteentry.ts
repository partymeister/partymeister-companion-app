export interface VoteEntry {
    id: number;
    author: string;
    competition: string;
    competition_id: number;
    deadline_reached: boolean;
    description: string;
    entry_number: number;
    filesize: number;
    orga_description: string;
    platform: string;
    remote_entry: boolean;
    running_time: string;
    screenshot: {};
    status: number;
    title: string;
    rating: number;
    comment: string;
    is_dirty: boolean;
    favourite: boolean;
    vote: any;
}
