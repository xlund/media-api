// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

enum CardType {
    VIDEO = 'video',
    IMAGE = 'image'
}
interface ImageData {
    id: number,
    title: string,
    description: string,
    filename: string
}


interface PlaybackData {
    id: number,
    videoId: number,
    time: number,
    video: VideoData,
}

interface VideoData extends ImageData {
    playLength: number,
    playback: PlaybackData,
}
