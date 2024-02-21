import { AudioResourceType } from "../player";
import YandexMusicAPIWrapper from "./yandex/yandex";
import YouTubeAPIWrapper from "./youtube/youtube";

const services = {
    "youtube": new YouTubeAPIWrapper(),
    "yandex": new YandexMusicAPIWrapper(),
};

export const getService = (name: AudioResourceType["name"]) => {
    const service = services[name];
    
    if (!service) return undefined;

    return service;
};

export default services;