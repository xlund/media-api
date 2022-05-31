interface File {
	id: number;
	title: string;
	description: string;
	filename: string;
}

type Image = File;

interface Video extends File {
	playLength: number;
	playback?: Playback;
	poster: string;
}

interface Playback {
	id: number;
	videoId: number;
	time: number;
	video: Video;
}

enum CardType {
	IMAGE = 'image',
	VIDEO = 'video'
}

export type { File, Image, Video, Playback };
export { CardType };
