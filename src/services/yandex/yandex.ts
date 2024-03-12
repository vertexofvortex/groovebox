import axios from "axios";
import "dotenv/config";
import { SearchResult, Track, TrackDownloadInfo, YandexAPIResponse } from "./models";
import { XMLParser } from "fast-xml-parser";
import md5 from "md5";
import { Readable } from "stream";
import { GrooveboxAudioResource } from "../../player";
import BaseMusicService from "../BaseMusicService";
import { CommandInteraction } from "discord.js";
import logger from "@utils/logger";

class YandexMusicService implements BaseMusicService {
    constructor() {}

    private axios = axios.create({
        headers: {
            "Authorization": `OAuth ${process.env.YANDEX_TOKEN}`,
        },
    });

    private signSalt = "XGRlBW9FXlekgbPrRHuSiA";

    find = async (query: string, interaction: CommandInteraction) => {
        try {
            const response = await this.axios.get<YandexAPIResponse<SearchResult<Track>>>(
                `https://api.music.yandex.net:443/search?text=${query}&page=0&type=track&nococrrect=false`
            );

            if (!response.data.result.tracks.results) {
                return undefined;
            }

            const results = response.data.result.tracks.results;
            const audioResources: GrooveboxAudioResource[] = results.map(result => ({
                title: `${result.artists.map(a => a.name).join(", ")} - ${result.title}`,
                addedBy: interaction.user,
                source: result.id,
                type: {
                    name: "yandex",
                    displayName: "Yandex",
                },
            }));

            return audioResources;
        } catch (error) {
            logger.error(error);

            return undefined;
        }
    };

    findFirst = async (query: string, interaction: CommandInteraction) => {
        const result = await this.find(query, interaction);

        if (!result) {
            return undefined;
        }

        return result[0];
    };

    fetchAudioResource = async (resource: GrooveboxAudioResource): Promise<Readable | undefined> => {
        try {
            const response = await this.axios.get<YandexAPIResponse<TrackDownloadInfo[]>>(`https://api.music.yandex.net:443/tracks/${resource.source}/download-info`);
            const mp3Tracks =  response.data.result.filter(track => track.codec == "mp3");
            const mp3Track320kbps = mp3Tracks.find(track => track.bitrateInKbps == 320);
            const mp3Track192kbps = mp3Tracks.find(track => track.bitrateInKbps == 192);
            let trackDirectLink;

            if (mp3Track320kbps) {
                trackDirectLink = await this.getTrackDirectLink(mp3Track320kbps.downloadInfoUrl);
            } else if (mp3Track192kbps) {
                trackDirectLink = await this.getTrackDirectLink(mp3Track192kbps.downloadInfoUrl);
            } else {
                return undefined;
            }

            if (!trackDirectLink) {
                return undefined;
            }

            try {
                const track = await this.axios.get<Readable>(trackDirectLink, { responseType: "stream" });
                
                if (!track.data) {
                    return undefined;
                }

                return track.data;
            } catch (error) {
                logger.error(error);

                return undefined;
            }
        } catch (error) {
            logger.error(error);

            return undefined;
        }
    };

    getTrackDirectLink = async (downloadInfoUrl: string) => {
        try {
            const response = await this.axios.get<string>(downloadInfoUrl);
            const xmlParser = new XMLParser();
            const downloadInfo = xmlParser.parse(response.data);

            const host: string = downloadInfo["download-info"].host;
            const path: string = downloadInfo["download-info"].path;
            const ts: string = downloadInfo["download-info"].ts;
            const s: string = downloadInfo["download-info"].s;
            const sign: string = md5(this.signSalt + path.substring(1) + s);

            return `https://${host}/get-mp3/${sign}/${ts}${path}`;
        } catch (error) {
            logger.error(error);

            return undefined;
        }
    };
}

export default YandexMusicService;