import { google } from "googleapis";
import "dotenv/config";
import ytdl from "ytdl-core";
import Ffmpeg from "fluent-ffmpeg";


const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_TOKEN
});

export const search = async (query: string) => {
    return youtube.search.list({
        part: ["snippet"],
        q: query
    });
};

export const getAudioStream = (videoId: string) => {
    const videoStream = ytdl(`http://www.youtube.com/watch?v=${videoId}`, { quality: "highestaudio" });

    return Ffmpeg({ source: videoStream });
};

export default youtube;