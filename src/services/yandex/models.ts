interface InvocationInfo {
    hostname: string,
    "req-id": string,
    "exec-duration-millis": string,
}

export interface YandexAPIResponse<Result> {
    invocationInfo: InvocationInfo,
    result: Result,
}

export interface YandexAPIError {
    invocationInfo: InvocationInfo,
    error: {
        name: string,
        message: string,
    }
}

export interface SearchResult<Track> {
    type: "track" | "album" | "artist" | "podcast" | "all",
    page: number,
    perPage: number,
    text: string,
    searchRequestId: string,
    tracks: {
        total: number,
        perPage: number,
        order: number,
        results: Track[],
    },
}

export interface Track {
    id: number,
    title: string,
    coverUri: string,
    artists: Artist[],
}

export interface Artist {
    name: string
}

export interface TrackDownloadInfo {
    codec: string,
    gain: boolean,
    preview: string,
    downloadInfoUrl: string,
    direct: boolean,
    bitrateInKbps: number,
}