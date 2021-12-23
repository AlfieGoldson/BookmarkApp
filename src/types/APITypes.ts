export interface NoEmbedBaseResponse {
	thumbnail_url: string;
	thumbnail_width: number;
	thumbnail_height: number;
	url: string;
	title: string;
	author_name: string;
	author_url: string;
	upload_date: string; // TODO: Undefined for Flickr?
}

export interface NoEmbedVimeoResponse extends NoEmbedBaseResponse {
	provider_name: 'Vimeo';
	duration: number;
}

export interface NoEmbedFlickerResponse extends NoEmbedBaseResponse {
	provider_name: 'Flickr';
	width: number;
	height: number;
}

export type NoEmbedResponse = NoEmbedVimeoResponse | NoEmbedFlickerResponse;
