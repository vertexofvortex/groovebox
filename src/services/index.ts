import { AudioResourceType } from "../player";
import YandexMusicService from "./yandex/yandex";
import YouTubeService from "./youtube/youtube";

const services = {
    "youtube": new YouTubeService(),
    "yandex": new YandexMusicService(),
};

export const getService = (name: AudioResourceType["name"]) => {
    const service = services[name];
    
    if (!service) return undefined;

    return service;
};

export default services;