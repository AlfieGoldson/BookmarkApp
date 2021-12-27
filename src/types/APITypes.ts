export const providerNames = ['Vimeo', 'Flickr'] as const;

export interface NoEmbedBaseResponse {
	provider_name: typeof providerNames[number];
	thumbnail_url: string;
	thumbnail_width: number;
	thumbnail_height: number;
	url: string;
	title: string;
	author_name: string;
	author_url: string;
	upload_date: string;
	duration: number;
	width: number;
	height: number;
}

export type NoEmbedResponse = Partial<NoEmbedBaseResponse>;
