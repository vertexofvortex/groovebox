import { EmbedBuilder } from "discord.js";
import { GrooveboxAudioResource } from "player";

export const formatPinnedMessageEmbed = (queue: GrooveboxAudioResource[]): EmbedBuilder => {
    const queueString = `
Tracks in the queue:
\`\`\`
${queue.map((track, index) => `${index + 1} ⸱ ${track.title} ⸱ ${track.type.displayName} ⸱ by ${track.addedBy.displayName}`)}
\`\`\``;

    return new EmbedBuilder()
        .setTitle("Groovebox")
        .setColor(0x3eaf7c)
        .setAuthor({
            name: "Groovebox Music Player",
            iconURL: "https://i.imgur.com/AfFp7pu.png",
        })
        .setDescription(queue.length != 0 ? queueString : "There are no tracks in the queue right now. Add some via `/play` command")
        .addFields(
            { name: "Test field", value: "Test value", inline: true },
            { name: "Test field", value: "Test value", inline: true },
            { name: "Discord API status", value: "OK (ping: 300ms)", inline: true }
        )
        .setImage("https://i.imgur.com/AfFp7pu.png")
        .setTimestamp(Date.now());
};

export default formatPinnedMessageEmbed;