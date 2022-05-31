export interface File {
    id: number;
    title: string;
    description: string;
    filename: string;
}

export type Image = File

export interface Video extends File {
    playLength: number;
    playback?: Playback;
}

export interface Playback {
    id: number;
    videoId: number;
    time: number;
    video: Video;
}
